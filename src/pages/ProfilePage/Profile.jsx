// import { useState, useEffect } from "react";

import { usePopup } from "@/hooks/popupContext";
import { useTheme } from "@/hooks/themeprovider";
import { CgCloseR } from "react-icons/cg";
export default function ProfilePage() {
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
              : gender === "male"
              ? "/manAvatar.jpg"
              : gender === "female"
              ? "/womanAvatar.jpg"
              : "/avatar.png"
          }
          alt="Profile"
          className="w-[400px]  rounded-md "
        />
      </div>
    );
  };
  const gender = "male";
  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <div className="  px-4 py-8 mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div
            onClick={() => handleSowProfileImage("/cover.jpg")}
            className="h-96 bg-gradient-to-r  cursor-pointer from-primary-foreground to-secondary"
          >
            <img
              src={
                "/cover.jpg"
                  ? "/cover.jpg"
                  : gender === "male"
                  ? "/manAvatar.jpg"
                  : gender === "female"
                  ? "/womanAvatar.jpg"
                  : "/avatar.png"
              }
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
                      : gender === "male"
                      ? "/manAvatar.jpg"
                      : gender === "female"
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
                  <h2 className="text-2xl font-bold">Alexandra Johnson</h2>
                  <p className="text-muted-foreground">
                    Senior Product Designer
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
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
