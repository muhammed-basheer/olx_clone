import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { UserContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config"; 
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  console.log("db",db)
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!image || !name || !category || !price) {
      return;
    }
  
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "First_time_using");
    data.append("cloud_name", "ddsvu2b3o");
  
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddsvu2b3o/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
  
      const uploadedImage = await res.json();
      console.log("Uploaded Image URL:", uploadedImage.url);
  
      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        url: uploadedImage.url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
  
      navigate("/");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header />
      {user ? (
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          {preview && <img alt="Preview" width="200px" height="200px" src={preview} />}
          <br />
          <input onChange={handleImageUpload} type="file" />
          <br />
          {loading ? (
            "Uploading..."
          ) : (
            <button onClick={handleSubmit} className="uploadBtn">
              Upload and Submit
            </button>
          )}
        </div>
      ) : (
        navigate("/login")
      )}
    </Fragment>
  );
};

export default Create;
