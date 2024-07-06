import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import '../css/upload.css';

const Upload = () => {
  const [fileUpload, setfileUpload] = useState(null);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    title: "",
    pdfURL: "",
  });

  const uploadFile = () => {
    if (fileUpload === null) {
      return;
    }

    const fileRef = ref(storage, `pdfs/${fileUpload.name}-${uuidv4()}`);
    uploadBytes(fileRef, fileUpload).then(async () => {
      const url = await getDownloadURL(fileRef);
      setdata({
        ...data,
        pdfURL: url,
      });
      alert("File uploaded successfully");
    }).catch(error => {
      console.error("Error uploading file:", error);
    });
  };

  const handleinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dailynews-backend.vercel.app/api/upload", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if(response.ok){
        setdata({ title: "", pdfURL: "" });
        alert("uploaded successfully");
        navigate("/admin");
      } else {
        console.log(resData.message);
      }

    } catch (error) {
      console.log(error);
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
        value={data.title}
        required
        onChange={handleinput}
        className="texttitle"
      />
    </label>
    <div className="file2">
 
      <div className="pdf2">
      <input
        type="file"
        name="pdfURL"
        id="pdfURL"
        onChange={(event) => setfileUpload(event.target.files[0])}
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

export default Upload;
