import React, { useEffect, useState } from 'react'
import "./ProfileSetting.css"

function ProfileSetting() {

  const [formData, setFormData] = useState({
    userID:'',
    userName: '',
    userEmail: '',
    userNumber: '',
    userAddress: '',
    userProfileURl: '',
    password  :'',

  });

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const id = localStorage.getItem("userID");
    const token = localStorage.getItem("authToken");
    console.log("ProfileSetting  ", token)
    try {
      const respondData = await fetch(`http://localhost:8081/user/search-by-id/${id}`, {
        method: "GET",
        headers:
        {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (respondData.ok) {
        const data = await respondData.json();
        setFormData({
          userID:data.userID || "",
          userName: data.userName || "",
          userEmail: data.userEmail || "",
          userNumber: data.userNumber || "",
          userAddress: data.userAddress || "",
          userProfileURl: data.userProfileURl || "",
          password: data.password || "",
        })
        alert(`${data.userName}, Welcome!`);

      }
      else {
        alert("Failed to fetch user data");
      }
    }
    catch {
      console.error("Error fetching data:", error);

    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Clothifystore");
      data.append("cloud_name", "dvqjf3iyq");

      const res = await fetch(`https://api.cloudinary.com/v1_1/dvqjf3iyq/image/upload`, {
        method: "POST",
        body: data,
      });

      const imageData = await res.json();

      if (imageData.secure_url) {
        setFormData(prev => ({
          ...prev,
          userProfileURl: imageData.secure_url,
        }));
      } else {
        console.error(error)
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered");
    const token = localStorage.getItem("authToken");
    try {
      const respond = await fetch(`http://localhost:8081/user/update-user`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify( formData )
      });
      if (respond.ok) {

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="photo-upload">
          <div className="photo-preview">
            {formData.userProfileURl ? (
              <img src={formData.userProfileURl} alt="Profile Preview" />
            ) : (
              <span className="placeholder">Upload</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="userNumber"
          value={formData.userNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="userAddress"
          value={formData.userAddress}
          onChange={handleChange}
          placeholder="Address"
          rows="3"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfileSetting