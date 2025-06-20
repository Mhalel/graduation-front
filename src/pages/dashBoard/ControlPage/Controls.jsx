import ContralsApi from "@/Apis/Contralls";
import { useAuth } from "@/hooks/AuthContext";
import { useSnackbar } from "@/hooks/SnackBar";
import { useState } from "react";

const Controls = () => {
  const [but, setBut] = useState(false);
  const { openSnackbar } = useSnackbar();
  const { auth } = useAuth();
  console.log("auth", auth);
  const handleClick = async () => {
    ContralsApi.Led1({
      pin: "D1",
      state: !but,
    })
      .then((res) => {
        console.log("res", res?.data);

        openSnackbar(
          `Pin ${res?.data?.pin} is ${
            res?.data?.state ? "opend" : "closed"
          } successflly`,
          {
            type: "success",
          }
        );
        setBut(!but);
      })
      .catch((err) => {
        console.log("err", err);
        openSnackbar("error", {
          type: "error",
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <label className="relative flex cursor-pointer items-center gap-3">
        <input
          onClick={handleClick}
          type="checkbox"
          className="peer sr-only"
          name="showProfile"
        />
        <div
          className={`relative h-[32px] w-[52px] rounded-full bg-gray-300 transition-colors duration-300 after:absolute after:top-1/2 after:h-[28px] after:w-[28px] after:-translate-y-1/2 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:duration-300 after:content-[''] peer-checked:bg-purple-500 ${
            but ? "after:translate-x-[22px]" : "after:translate-x-[2px]"
          } `}
        />
      </label>
    </div>
  );
};

export default Controls;
