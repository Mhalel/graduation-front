import AuthApi from "@/Apis/Auth";
import Readings from "@/Apis/GreenHouseRequsts";
import GPTApis from "@/Apis/AiModels";
import { useAuth } from "@/hooks/AuthContext";
import { useT } from "@/hooks/LangContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useTheme } from "@/hooks/themeprovider";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();
  const nav = useNavigate();
  const T = useT();
  const { openSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { updateUser, setToken, setAccount, setAuth, auth } = useAuth();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = T("البريد الإلكتروني مطلوب", "Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = T(
        "تنسيق البريد الإلكتروني غير صالح",
        "Invalid email format"
      );
    }
    if (!formData.password) {
      newErrors.password = T("كلمة المرور مطلوبة", "Password is required");
    } else if (formData.password.length < 6) {
      newErrors.password = T(
        "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        "Password must be at least 6 characters"
      );
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      AuthApi.signIn(formData)
        .then((res) => {
          const { token, account } = res?.data || {};
          setToken(token, account);
          setAuth(token);
          setAccount(account);
          openSnackbar(T("تم تسجيل الدخول بنجاح", "Signed in successfully"), {
            type: "success",
          });
          Readings.getRead(500)
            .then((res) => {
              localStorage.setItem("sensor_readings", JSON.stringify(res.data));
            })
            .catch(console.error);
          Readings.getAlerts(800)
            .then((res) => {
              localStorage.setItem("wornings", JSON.stringify(res.data));
            })
            .catch(console.error);
          GPTApis.GptChatHestory({ auth })
            .then((res) => {
              const sortedMessages = res.data.Hestory.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              ).flatMap((chat) => chat.messages);
              localStorage.setItem(
                "GPTHestory",
                JSON.stringify(sortedMessages)
              );
            })
            .catch(console.error);
          nav("/dashboard/charts");
        })
        .catch(() => {
          setLoading(false);
          openSnackbar(
            T(
              "حدث خطأ ما أثناء تسجيل الدخول",
              "Something went wrong while signing in"
            ),
            { type: "error" }
          );
        });
    }
  };

  return (
    <div
      dir={T("rtl", "ltr")}
      className={`w-full min-h-screen flex justify-center items-center p-4 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-950 to-zinc-950"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 ${
            isDark ? "bg-blue-700/5" : "bg-blue-400/20"
          } rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${
            isDark ? "bg-purple-700/5" : "bg-purple-400/20"
          } rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className={`${
            isDark
              ? "bg-black/80 border-zinc-800/50"
              : "bg-white/80 border-gray-200/50"
          } backdrop-blur-xl border rounded-2xl shadow-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-3xl`}
        >
          <div className="text-center mb-2">
            <h2
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              } mb-2`}
            >
              {T("تسجيل الدخول", "Sign In")}
            </h2>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              {T("مرحبًا بعودتك", "Welcome back")}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-zinc-300" : "text-gray-700"
              }`}
            >
              {T("البريد الإلكتروني", "Email")}
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  errors.email
                    ? "text-red-500"
                    : isDark
                    ? "text-zinc-400"
                    : "text-gray-500"
                }`}
              />
              <span className="absolute z-10 top-1/2 left-0 translate-x-3 -translate-y-1/2 ">
                <User />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : isDark
                    ? "border-zinc-700 bg-zinc-900 text-white focus:border-blue-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"
                } transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm placeholder-gray-400`}
                placeholder={T("ادخل بريدك الإلكتروني", "Enter your email")}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-zinc-300" : "text-gray-700"
              }`}
            >
              {T("كلمة المرور", "Password")}
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  errors.password
                    ? "text-red-500"
                    : isDark
                    ? "text-zinc-400"
                    : "text-gray-500"
                }`}
              />
              <span className="absolute z-10 top-1/2 left-0 translate-x-3 -translate-y-1/2 ">
                <Lock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-10 py-3 rounded-xl border-2 ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : isDark
                    ? "border-zinc-700 bg-zinc-900 text-white focus:border-blue-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"
                } transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm placeholder-gray-400`}
                placeholder={T("ادخل كلمة المرور", "Enter your password")}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? T("اخفاء كلمة المرور", "Hide password")
                    : T("اظهار كلمة المرور", "Show password")
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1 animate-shake">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            } focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:transform-none`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <FaSpinner className="animate-spin text-lg" />
                <span>{T("جاري تسجيل الدخول...", "Signing in...")}</span>
              </div>
            ) : (
              <span>{T("تسجيل الدخول", "Sign In")}</span>
            )}
          </button>

          {/* Footer */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              {T("ليس لديك حساب؟", "Don't have an account?")}{" "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                onClick={() => nav("/signup")}
              >
                {T("انشاء حساب", "Create Account")}
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

export default Signin;
