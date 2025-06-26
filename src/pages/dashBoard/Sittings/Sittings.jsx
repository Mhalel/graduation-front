import { useEffect, useRef, useState } from "react";
import {
  Trash2,
  AlertTriangle,
  Settings,
  Database,
  Bell,
  Shield,
  User,
  Edit3,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useT } from "@/hooks/LangContext";
import Delete from "@/Apis/Delete";
import { useSnackbar } from "@/hooks/SnackBar";
import { useAuth } from "@/hooks/AuthContext";
import { useSocket } from "@/hooks/SensorReadings";
import { useFileUploader } from "@/hooks/FileProvider";
import UserApi from "@/Apis/User";

export default function Sittings() {
  const { setWorning, setReadings, setRealTimeReading } = useSocket();
  const { account, auth, setAccount } = useAuth();
  const [dragOv, setDragOv] = useState(false);
  const [accountData, setAccountData] = useState({
    fullName: account?.fullName || "",
    userName: account?.userName || "",
    dateOfBirth: account?.dateOfBirth || "",
    photoLink: account?.photoLink || "",
    email: account?.email || "",
    phone: account?.phone || "",
    gender: account?.gender || "",
  });
  useEffect(() => {
    console.log("account", account);
  }, [account]);

  const fileInputRef = useRef();

  const { imagePreview, handleFileChange } = useFileUploader();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOv(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOv(false);
  };

  const preview = imagePreview || account?.photoLink;

  const T = useT();
  const { openSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState({
    account: false,
    readings: false,
    notifications: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه!"
      )
    ) {
      setIsDeleting((prev) => ({ ...prev, account: true }));
      Delete.DeleteAccount(auth)
        .then(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("account");
          localStorage.removeItem("tokenExpiration");
          console.log("تم حذف الحساب");
          openSnackbar(
            T("تم حذف الحساب بنجاح", "Account deleted successfully"),
            { type: "success" }
          );
          window.location.href = "/";
        })
        .catch((error) => {
          openSnackbar(T("خطأ في حذف الحساب", "Error deleting account"), {
            type: "error",
          });
          console.error("خطأ في حذف الحساب:", error);
        })
        .finally(() => {
          setIsDeleting((prev) => ({ ...prev, account: false }));
        });
    }
  };

  const handleDeleteReadings = () => {
    if (window.confirm("هل أنت متأكد من حذف جميع القراءات؟")) {
      setIsDeleting((prev) => ({ ...prev, readings: true }));
      Delete.DeleteReadings()
        .then(() => {
          localStorage.removeItem("sensor_readings");
          console.log("تم حذف القراءات");
          openSnackbar(
            T("تم حذف القراءات بنجاح", "Readings deleted successfully"),
            { type: "success" }
          );
          setReadings([]);
          setRealTimeReading({
            autoState: false,
            dhFanState: false,
            ccFanState: false,
            acFanState: false,
            pumpState: false,
            ledState: false,
            lux: 0,
            luxGoal: 0,
            eTemp: 0,
            humidity: 0,
            pressure: 0,
            cTemp: 0,
            s1Temp: 0,
            s2Temp: 0,
            s1Moisture: 0,
            s2Moisture: 0,
          });
        })
        .catch((error) => {
          openSnackbar(T("خطأ في حذف القراءات", "Error deleting readings"), {
            type: "error",
          });
          console.error("خطأ في حذف القراءات:", error);
        })
        .finally(() => {
          setIsDeleting((prev) => ({ ...prev, readings: false }));
        });
    }
  };

  const handleDeleteNotifications = async () => {
    if (window.confirm("هل أنت متأكد من حذف جميع الإشعارات؟")) {
      setIsDeleting((prev) => ({ ...prev, notifications: true }));
      try {
        Delete.DeleteAlerts();
        openSnackbar(
          T("تم حذف الإشعارات بنجاح", "Notifications deleted successfully"),
          { type: "success" }
        );
        localStorage.removeItem("wornings");
        setWorning([]);
        console.log("تم حذف الإشعارات");
      } catch (error) {
        console.error("خطأ في حذف الإشعارات:", error);
      } finally {
        setIsDeleting((prev) => ({ ...prev, notifications: false }));
      }
    }
  };

  // Account update handlers
  const handleInputChange = (field, value) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateAccount = async () => {
    setIsUpdating(true);
    UserApi.UpdateProfile(accountData, auth)
      .then((res) => {
        openSnackbar(
          T("تم تحديث الحساب بنجاح", "Account updated successfully"),
          {
            type: "success",
          }
        );
        setIsEditing(false);
        UserApi.GetAccountData(auth).then((res) => {
          setAccount(res?.data);
          localStorage.setItem("account", JSON.stringify(res?.data));
        });
      })
      .catch((err) => {
        openSnackbar(T("خطأ في تحديث الحساب", "Error updating account"), {
          type: "error",
        });
        console.error("خطأ في تحديث الحساب:", error);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleCancelEdit = () => {
    setAccountData({
      fullName: account?.fullName || "",
      userName: account?.userName || "",
      dateOfBirth: account?.dateOfBirth || "",
      photoLink: account?.photoLink || "",
      email: account?.email || "",
      phone: account?.phone || "",
      gender: account?.gender || "",
    });
    setIsEditing(false);
  };
  useEffect(() => {
    setAccountData((prev) => ({ ...prev, photoLink: imagePreview }));
  }, [imagePreview]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {T("الإعدادات", "Settings")}
                </h1>
                <p className="text-muted-foreground">
                  {T("إدارة الحساب والتطبيق", "Manage Account and App")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {T("إعدادات الحساب", "Account Settings")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "تحديث معلومات الحساب الشخصي",
                      "Update personal account information"
                    )}
                  </p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm">{T("تعديل", "Edit")}</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Profile Photo */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="relative">
                  <div
                    className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed ${
                      dragOv && "border-blue-400"
                    } transition`}
                    onDrop={isEditing && handleDrop}
                    onDragOver={isEditing && handleDragOver}
                    onDragLeave={isEditing && handleDragLeave}
                    onClick={() => isEditing && fileInputRef.current.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-primary" />
                    )}
                  </div>

                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute -bottom-1 -right-1 p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {accountData.fullName || T("اسم المستخدم", "Username")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {accountData.email || T("البريد الإلكتروني", "Email")}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("الاسم الكامل", "Full Name")}
                  </label>
                  <input
                    type="text"
                    value={accountData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("اسم المستخدم", "Username")}
                  </label>
                  <input
                    type="text"
                    value={accountData.userName}
                    onChange={(e) =>
                      handleInputChange("userName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("البريد الإلكتروني", "Email")}
                  </label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("رقم الهاتف", "Phone Number")}
                  </label>
                  <input
                    type="tel"
                    value={accountData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("تاريخ الميلاد", "Date of Birth")}
                  </label>
                  <input
                    type="date"
                    value={accountData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {T("الجنس", "Gender")}
                  </label>
                  <select
                    value={accountData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:bg-muted disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{T("اختر الجنس", "Select Gender")}</option>
                    <option value="male">{T("ذكر", "Male")}</option>
                    <option value="female">{T("أنثى", "Female")}</option>
                  </select>
                </div>

                {/* Password */}
                {/* {isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {T("كلمة المرور الجديدة", "New Password")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={accountData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder={T(
                          "اتركه فارغاً للاحتفاظ بكلمة المرور الحالية",
                          "Leave empty to keep current password"
                        )}
                        className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleUpdateAccount}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex-1"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {isUpdating
                        ? T("جاري الحفظ...", "Saving...")
                        : T("حفظ التغييرات", "Save Changes")}
                    </span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span>{T("إلغاء", "Cancel")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Data Deletion Operations */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {T("عمليات حذف البيانات", "Data Deletion Operations")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {T("معلومات السلامة", "Safety Information")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <Database className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {T("حذف القراءات", "Delete Readings")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T(
                          " حذف جميع قراءات العداد المحفوظة",
                          "Delete all saved meter readings"
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteReadings}
                    disabled={isDeleting.readings}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.readings
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف", "Delete")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Delete Notifications */}
              <div className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Bell className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {T("حذف الإشعارات", "Delete Notifications")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T(
                          "حذف جميع الإشعارات المحفوظة",
                          "Delete all saved notifications"
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteNotifications}
                    disabled={isDeleting.notifications}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.notifications
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف", "Delete")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="group bg-destructive/5 border border-destructive/20 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-destructive">
                        {T("حذف الحساب", "Delete Account")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T("حذف الحساب نهائياً", "Delete account permanently")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting.account}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 disabled:bg-destructive/50 text-destructive-foreground rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.account
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف الحساب", "Delete Account")}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Warning Panel */}
            <div className="mt-6 space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      {T("عمليات لا يمكن التراجع عنها", "Irreversible Actions")}
                    </p>
                    <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                      {T(
                        ` جميع عمليات الحذف المذكورة أعلاه لا يمكن التراجع عنها.
                      تأكد من عمل نسخة احتياطية من بياناتك المهمة قبل المتابعة.`,
                        `All of the above deletions cannot be undone.
Make sure to back up your important data before proceeding.`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      {T("نصائح الأمان", "Security Tips")}
                    </p>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>
                        {T(
                          "• قم بعمل نسخة احتياطية قبل الحذف",
                          "• Make a backup before deleting."
                        )}
                      </li>
                      <li>
                        {T(
                          "• تأكد من عدم حاجتك للبيانات مستقبلاً",
                          "• Make sure you don't need the data in the future."
                        )}
                      </li>
                      <li>
                        {T(
                          "• اقرأ التحذيرات بعناية",
                          "• Read the warnings carefully."
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
