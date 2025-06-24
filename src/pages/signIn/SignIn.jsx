import GPTApis from "@/Apis/AiModels";
import AuthApi from "@/Apis/Auth";
import Readings from "@/Apis/GreenHouseRequsts";
import { useAuth } from "@/hooks/AuthContext";
import { useT } from "@/hooks/LangContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useState } from "react";
import { FaS, FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const T = useT();
  const { openSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { updateUser, logout, setToken, setAccount, account, setAuth, auth } =
    useAuth();
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      console.log("Form Submitted:", formData);
      AuthApi.signIn(formData)
        .then((res) => {
          console.log("res", res);
          setLoading(false);
          setToken(res?.data?.token, res?.data?.account);
          setAuth(res?.data?.token);
          setAccount(res?.data?.account);
          openSnackbar(T("تم التسجيل بنجاح", "Singedin successfully"), {
            type: "success",
          });
          Readings.getRead(500)
            .then((res) => {
              console.log("res", res);
              const sensor_readings = res.data;
              localStorage.setItem(
                "sensor_readings",
                JSON.stringify(sensor_readings)
              );
            })
            .catch((err) => {
              console.error(err);
            });
          Readings.getAlerts(800)
            .then((res) => {
              console.log("res", res);
              const wornings = res.data;
              localStorage.setItem("wornings", JSON.stringify(wornings));
            })
            .catch((err) => {
              console.error(err);
            });
          GPTApis.GptChatHestory({ auth })
            .then((res) => {
              const { Hestory } = res.data;
              const sortedMessages = Hestory.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              ).flatMap((chat) => chat.messages);
              localStorage.setItem(
                "GPTHestory",
                JSON.stringify(sortedMessages)
              );
            })
            .catch((errors) => {
              console.error(errors);
            });

          nav("/dashboard/charts");
        })
        .catch(() => {
          setLoading(false);
          openSnackbar(
            T("حدث خطأ ما اثناء التسجيل", "something wentwrong while signin"),
            { type: "error" }
          );
        });
    }
  };

  return (
    <div className="w-full text-black min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-xl font-bold text-center">
          {T("تسجيل الدخول", "Sign In")}
        </h2>

        <label className="flex flex-col gap-1">
          <span className="text-gray-700 font-medium">
            {T("البريد إلكتروني", "Email")}
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-gray-700 font-medium">
            {T("كلمه السر", "Password")}
          </span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`p-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </label>

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

export default Signin;
