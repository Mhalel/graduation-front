// import { useState, useEffect } from "react";

import { useAuth } from "@/hooks/AuthContext";
import { usePopup } from "@/hooks/popupContext";
import { useTheme } from "@/hooks/themeprovider";
import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { CgCloseR } from "react-icons/cg";
import { useLang } from "@/hooks/LangContext";
import { useFileUploader } from "@/hooks/FileProvider";
import AuthApi from "@/Apis/Auth";
export default function ProfilePage() {
  const { account, auth } = useAuth();
  const { popup } = usePopup();
  const handleSowProfileImage = (photo) => {
    popup.run(
      <div className="bg-white p-2 rounded-md overflow-auto">
        <button
          onClick={() => popup.close()}
          className="mb-10 ml-auto w-fit  text-[25px] hover:scale-110"
        >
          <CgCloseR />
        </button>
        <img
          src={
            photo
              ? photo
              : account?.gender === "male"
              ? "/manAvatar.jpg"
              : account?.gender === "female"
              ? "/womanAvatar.jpg"
              : "/avatar.png"
          }
          alt="Profile"
          className="w-[400px]  rounded-md "
        />
      </div>
    );
  };
  const handleEditProfile = () => {
    popup.run(<ProfileEditForm />);
  };
  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <div className="  px-4 py-8 mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div
            onClick={() => handleSowProfileImage("/cover.jpg")}
            className="h-96 bg-gradient-to-r  cursor-pointer from-primary-foreground to-secondary"
          >
            <img
              src={"/cover.jpg"}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div
                onClick={() => handleSowProfileImage("/Ahmed.jpg")}
                className="h-32 w-32 rounded-full cursor-pointer border-4 border-background overflow-hidden bg-accent"
              >
                <img
                  src={
                    "/Ahmed.jpg"
                      ? "/Ahmed.jpg"
                      : account?.gender === "male"
                      ? "/manAvatar.jpg"
                      : account?.gender === "female"
                      ? "/womanAvatar.jpg"
                      : "/avatar.png"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{account?.fullName}</h2>
                  <p className="text-muted-foreground">
                    Senior Product Designer
                  </p>
                </div>
                <button
                  onClick={() => handleEditProfile()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                >
                  Edit Profile
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold">248</span>
                  <span className="text-muted-foreground text-sm">Posts</span>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold">12.4k</span>
                  <span className="text-muted-foreground text-sm">
                    Followers
                  </span>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold">364</span>
                  <span className="text-muted-foreground text-sm">
                    Following
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-card-foreground">
                  Product designer with over 8 years of experience creating
                  digital experiences that delight users. Passionate about
                  accessibility and inclusive design principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2025 Your Profile. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}

function ProfileEditForm() {
  const { lang } = useLang();
  const imageRef = useRef();
  const dropRef = useRef(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    userName: "",
    dateOfBirth: "",
    password: "",
    photoLink: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) convertToBase64(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) convertToBase64(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photoLink: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Profile submitted:", profile);
    AuthApi.edit(profile, auth)
      .then((res) => {
        setLoading(false);
        console.log("res", res);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <section
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex justify-center items-center min-h-screen bg-background"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
          <div className="p-6 bg-primary text-primary-foreground">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <p className="text-sm opacity-80">
              Update your personal information
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            ref={dropRef}
          >
            {/* Photo Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {profile.photoLink ? (
                    <img
                      src={profile.photoLink}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl text-muted-foreground">
                      {profile.fullName
                        ? profile.fullName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </div>
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageRef.current.click()}
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md"
                >
                  <Camera size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Drag & drop an image or click the camera icon
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Username*
                </label>
                <input
                  type="text"
                  name="userName"
                  value={profile.userName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-border">
              <button
                type="button"
                className="px-4 py-2 border border-border rounded-md bg-secondary text-secondary-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
