import AuthApi from "@/Apis/Auth";
import { useAuth } from "@/hooks/AuthContext";
import { useFileUploader } from "@/hooks/FileProvider";
import { useT } from "@/hooks/LangContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useTheme } from "@/hooks/themeprovider";
import {
  Camera,
  User,
  Mail,
  Phone,
  Lock,
  UserCheck,
  Users,
  EyeOff,
  Eye,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const T = useT();
  const [loading, setLoading] = useState(false);
  const [dragOv, setDragOv] = useState(false);
  const { isDark } = useTheme();
  const { setToken, setAccount, setAuth } = useAuth();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
      icon: User,
    },
    {
      label: T("اسم المستخدم", "Username"),
      name: "userName",
      type: "text",
      placeholder: T("ادخل اسم المستخدم", "Enter your username"),
      icon: UserCheck,
    },
    {
      label: T("البريد الإلكتروني", "Email"),
      name: "email",
      type: "email",
      placeholder: T("ادخل بريدك الإلكتروني", "Enter your email"),
      icon: Mail,
    },
    {
      label: T("رقم الهاتف", "Phone"),
      name: "phone",
      type: "tel",
      placeholder: T("ادخل رقم الهاتف", "Enter your phone number"),
      icon: Phone,
    },
    {
      label: T("النوع", "Gender"),
      name: "gender",
      type: "select",
      placeholder: T("اختر النوع", "Select gender"),
      icon: Users,
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
      icon: Lock,
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await AuthApi.signup(formData);
      openSnackbar(T("تم التسجيل بنجاح", "Signup successful"), {
        type: "success",
      });
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
      } else throw new Error("Invalid signin response");
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
    if (file?.type.startsWith("image/")) handleFileChange(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOv(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOv(false);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, photoLink: imagePreview }));
  }, [imagePreview]);

  return (
    <div
      dir={T("rtl", "ltr")}
      className={`w-full min-h-screen flex justify-center items-center p-4 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-950 to-zinc-950"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <div className="relative z-10 w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className={`${
            isDark
              ? "bg-black/80 border-zinc-800/50"
              : "bg-white/80 border-gray-200/50"
          } backdrop-blur-xl border rounded-2xl shadow-2xl p-8 flex flex-col gap-6`}
        >
          <div className="text-center mb-2">
            <h2
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              } mb-2`}
            >
              {T("انشاء حساب", "Create Account")}
            </h2>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              {T("انضم إلينا اليوم", "Join us today")}
            </p>
          </div>

          <div className="relative flex justify-center mb-4">
            <div className="relative group">
              <div
                className={`w-24 h-24 ${
                  isDark ? "bg-zinc-900" : "bg-gray-100"
                } rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-4 ${
                  dragOv
                    ? "border-blue-500 scale-105"
                    : isDark
                    ? "border-zinc-700"
                    : "border-gray-300"
                } transition-all duration-300 hover:scale-105 hover:border-blue-500 shadow-lg`}
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-8 h-8 ${
                  isDark ? "bg-blue-600" : "bg-blue-500"
                } rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
              >
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field, i) => {
              const Icon = field.icon;
              return (
                <div key={i} className={`space-y-2`}>
                  <label
                    className={`text-sm font-medium ${
                      isDark ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                      <Icon
                        className={`w-5 h-5 ${
                          errors[field.name]
                            ? "text-red-500"
                            : isDark
                            ? "text-zinc-400"
                            : "text-gray-500"
                        } transition-colors`}
                      />
                    </div>
                    {field.type === "password" ? (
                      <>
                        <input
                          type={showPassword ? "text" : "password"}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 ${
                            errors[field.name]
                              ? "border-red-500 bg-red-50"
                              : isDark
                              ? "border-zinc-700 bg-zinc-900 text-white focus:border-blue-500"
                              : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"
                          } transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm placeholder-gray-400`}
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          aria-invalid={!!errors[field.name]}
                        />
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </div>
                      </>
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                          errors[field.name]
                            ? "border-red-500 bg-red-50"
                            : isDark
                            ? "border-zinc-700 bg-zinc-900 text-white focus:border-blue-500"
                            : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"
                        } transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm`}
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
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                          errors[field.name]
                            ? "border-red-500 bg-red-50"
                            : isDark
                            ? "border-zinc-700 bg-zinc-900 text-white focus:border-blue-500"
                            : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"
                        } transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm placeholder-gray-400`}
                        placeholder={field.placeholder}
                        aria-label={field.label}
                        aria-invalid={!!errors[field.name]}
                      />
                    )}
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            } focus:outline-none focus:ring-4 focus:ring-blue-500/30`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <FaSpinner className="animate-spin text-lg" />
                <span>{T("جاري التسجيل...", "Creating Account...")}</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {T("انشاء الحساب", "Create Account")}
              </span>
            )}
          </button>

          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              {T("لديك حساب بالفعل؟", "Already have an account?")}{" "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                onClick={() => nav("/signin")}
              >
                {T("تسجيل الدخول", "Sign In")}
              </button>
            </p>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;
