import AuthApi from "@/Apis/Auth";
import { useAuth } from "@/hooks/AuthContext";
import { useFileUploader } from "@/hooks/FileProvider";
import { useT } from "@/hooks/LangContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useTheme } from "@/hooks/themeprovider";
import { Camera, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const T = useT();
  const [loading, setLoading] = useState(false);
  const [dragOv, setDragOv] = useState(false);
  const { isDark } = useTheme();
  const { updateUser, logout, setToken, setAccount, account, setAuth, auth } =
    useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    photoLink: "",
  });

  const { openSnackbar } = useSnackbar();
  const nav = useNavigate();

  const inputFields = [
    {
      label: T("الاسم الكامل", "Full Name"),
      name: "fullName",
      type: "text",
      placeholder: T("ادخل اسمك", "Enter your name"),
    },
    {
      label: T("اسم المستخدم", "Username"),
      name: "userName",
      type: "text",
      placeholder: T("ادخل اسم المستخدم", "Enter your username"),
    },
    {
      label: T("البريد الإلكتروني", "Email"),
      name: "email",
      type: "email",
      placeholder: T("ادخل بريدك الإلكتروني", "Enter your email"),
    },
    {
      label: T("رقم الهاتف", "Phone"),
      name: "phone",
      type: "tel",
      placeholder: T("ادخل رقم الهاتف", "Enter your phone number"),
    },
    {
      label: T("النوع", "Gender"),
      name: "gender",
      type: "select",
      placeholder: T("اختر النوع", "Select gender"),
      options: [
        { value: "male", label: T("ذكر", "Male") },
        { value: "female", label: T("أنثى", "Female") },
      ],
    },
    {
      label: T("كلمة المرور", "Password"),
      name: "password",
      type: "password",
      placeholder: T("ادخل كلمة المرور", "Enter your password"),
    },
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = T("الاسم الكامل مطلوب", "Full name is required");

    if (!formData.userName.trim())
      newErrors.userName = T("اسم المستخدم مطلوب", "Username is required");

    if (!formData.email)
      newErrors.email = T("البريد الإلكتروني مطلوب", "Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = T("تنسيق البريد الإلكتروني غير صالح", "Invalid email");

    if (!formData.phone)
      newErrors.phone = T("رقم الهاتف مطلوب", "Phone number is required");
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = T("رقم الهاتف غير صالح", "Invalid phone number");

    if (!formData.gender)
      newErrors.gender = T("النوع مطلوب", "Gender is required");

    if (!formData.password)
      newErrors.password = T("كلمة المرور مطلوبة", "Password is required");
    else if (formData.password.length < 6)
      newErrors.password = T(
        "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        "Password must be at least 6 characters"
      );

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Signup step
      await AuthApi.signup(formData);
      openSnackbar(T("تم التسجيل بنجاح", "Signup successful"), {
        type: "success",
      });

      // Signin step
      const res = await AuthApi.signIn({
        email: formData.email,
        password: formData.password,
      });

      const { token, account } = res?.data || {};
      if (token && account) {
        setToken(token, account);
        setAuth(token);
        setAccount(account);
        nav("/dashboard/charts");
      } else {
        throw new Error("Invalid signin response");
      }
    } catch (err) {
      const res = err?.response?.data;
      const fallback = T(
        "حدث خطأ، حاول مرة أخرى",
        "An error occurred. Please try again."
      );

      const msg =
        res?.msg ||
        (res?.errors && Object.values(res.errors).join(" - ")) ||
        fallback;

      openSnackbar(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

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

  const preview = imagePreview;
  useEffect(() => {
    setFormData((prev) => ({ ...prev, photoLink: imagePreview }));
  }, [imagePreview]);
  return (
    <div
      dir={T("rtl", "ltr")}
      className={`w-full my-10 ${
        isDark ? "text-white" : "text-black"
      } min-h-screen flex justify-center items-center`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          isDark ? "bg-zinc-900" : "bg-white"
        } p-8 rounded-lg shadow-lg w-full max-w-md  flex flex-col gap-6`}
      >
        <h2 className="text-xl font-bold text-center">
          {T("انشاء حساب", "Sign Up")}
        </h2>
        <div className="relative">
          <div
            className={`w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed ${
              dragOv && "border-blue-400"
            } transition`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
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
        </div>
        {inputFields.map((field, i) => (
          <label key={i} className="flex flex-col gap-1">
            <span
              className={`${
                isDark ? "text-white" : "text-gray-700"
              } font-medium`}
            >
              {field.label}
            </span>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`rounded-md text-black border px-3 py-2 text-sm ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors[field.name]}
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`p-2 border rounded-md text-black ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={field.placeholder}
                aria-label={field.label}
                aria-invalid={!!errors[field.name]}
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name]}</p>
            )}
          </label>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded-md flex justify-center items-center hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            T("سجل", "Submit")
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
