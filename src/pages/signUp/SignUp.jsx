import AuthApi from "@/Apis/Auth";
import { useT } from "@/hooks/LangContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const T = useT();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    AuthApi.signup(formData)
      .then(() => {
        openSnackbar(T("تم التسجيل بنجاح", "Signup successful"), {
          type: "success",
        });
        nav("/signIn");
      })
      .catch((err) => {
        openSnackbar(
          err?.response?.data?.msg ||
            T("حدث خطأ، حاول مرة أخرى", "An error occurred. Please try again."),
          { type: "error" }
        );
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div
      dir={T("rtl", "ltr")}
      className="w-full my-10 min-h-screen flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-xl font-bold text-center">
          {T("انشاء حساب", "Sign Up")}
        </h2>

        {inputFields.map((field, i) => (
          <label key={i} className="flex flex-col gap-1">
            <span className="text-gray-700 font-medium">{field.label}</span>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`rounded-md border px-3 py-2 text-sm ${
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
                value={formData[field.name]}
                onChange={handleChange}
                className={`p-2 border rounded-md ${
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
