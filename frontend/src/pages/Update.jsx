import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import '../css/upload.css';


const Update = () => {
  const { id } = useParams(); // getting id
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(null);
  const [data, setData] = useState({
    title: "",
    pdfURL: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://daily-news-backend.vercel.app/api/display/${id}`, {
          method: "GET",
        });
        const res_data = await response.json();
        setData(res_data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Fetch data to display

  const uploadFile = () => {
    if (!fileUpload) return;

    const fileRef = ref(storage, `pdfs/${fileUpload.name}-${uuidv4()}`);
    uploadBytes(fileRef, fileUpload)
      .then(async () => {
        const url = await getDownloadURL(fileRef);
        setData({ ...data, pdfURL: url });
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://daily-news-backend.vercel.app/api/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setData({ title: "", pdfURL: "" });
        alert("Newspaper updated successfully");
        navigate("/admin")
      } else {
        const resData = await response.json();
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error updating newspaper:", error);
    }
  };

  return (
    <div className="upload">
      <div className="container">
      <form onSubmit={handleSubmit}>
    <label htmlFor="title">
      Newspaper Title:
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter newspaper name"
        value={data.title || ""}
        required
        onChange={handleInput}
        className="texttitle"
      />
    </label>
    <div className="file2">
 
      <div className="pdf2">
      <input
        type="file"
        name="pdfURL"
        id="pdfURL"
        onChange={(event) => setFileUpload(event.target.files[0])}
      />
      <button type="button" onClick={uploadFile}>Upload File</button>
      </div>
      
    </div>
    <button type="submit" className="submit2">Publish Newspaper</button>
  </form>
      </div>
 
</div>
  );
};

export default Update;
