import React, { useState } from "react";
import axios from "axios";

const UploadWithSignature = () => {
  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const upload = async () => {
    if (!file) return alert("اختر صورة");

    try {
      // ✅ 1. احصل على التوقيع من الباك
      // const sigRes = await axios.post("http://localhost:5000/api/cloudinary-signature");
      // const { apiKey, timestamp, signature, cloudName } = sigRes.data;

      // ✅ 2. جهز الفورم داتا
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // ✅ 3. ارفع الصورة إلى Cloudinary
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setPhotoUrl(uploadRes.data.secure_url);
      alert("✅ تم رفع الصورة");
    } catch (error) {
      console.error(error);
      alert("❌ فشل في الرفع");
    }
  };

  return (
    <div className="p-4 border w-fit space-y-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button
        onClick={upload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        رفع الصورة بـ API_SECRET
      </button>

      {photoUrl && (
        <div>
          <p>📸 تم الرفع:</p>
          <img src={photoUrl} alt="uploaded" className="w-40 h-40 object-cover" />
          <p className="break-all mt-2">{photoUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UploadWithSignature;
