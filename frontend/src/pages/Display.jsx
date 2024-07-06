import React, { useEffect, useState } from "react";
import "../css/display.css";
import { FaFileDownload } from "react-icons/fa";

const Display = () => {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/display", {
          method: "GET",
        });

        const res_data = await response.json();
        setData(res_data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAll();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDownload = async (url, title) => {
    try {
      const response = await fetch(
        `http://localhost:5000/proxy?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`
      );
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobURL;
      link.download = title;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="pdf-container">
      {data.map((d, index) => (
        <div key={index} className="pdf-item">
          {isMobile ? (
            <div className="imagediv"></div>
          ) : (
            <embed
              src={d.pdfURL}
              width="100%"
              height="400"
              type="application/pdf"
              className="pdf"
            />
            
          )}
          <p className="title">
            {d.title}
            <span
              className="download"
              onClick={() => handleDownload(d.pdfURL, `${d.title}.pdf`)}
            >
              <FaFileDownload />
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Display;
