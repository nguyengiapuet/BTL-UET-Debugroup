import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import appLogo from "../../../asset/image.png";
import { AuthContext } from "../../../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext)
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (userData.id) {
    navigate("/popular");
  }
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(SummaryApi.signUp.url, data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-gray-200 backdrop-opacity-5 z-[999] fixed top-0 bottom-0 right-0 left-0 flex w-full h-screen justify-center items-center">
      <form
        className="w-[500px] bg-white flex flex-col gap-4 px-4 py-2 rounded-xl items-center drop-shadow-md"
        onSubmit={handleOnSubmit}
      >
        <img className="w-[200px]" src={appLogo} />

        <div className="flex w-full">
          <label className="mx-5 text-2xl font-medium">Welcome,</label>
        </div>

        <div className="bg-[#f5f6f9] mx-5 w-full rounded-xl">
          <div className="my-5 mx-5 flex flex-col gap-1">
            <label className="text-[16px] text-[#001452] font-medium">
              Username:
            </label>
            <input
              name="username"
              value={data.email}
              onChange={handleOnChange}
              type="text"
              placeholder="Enter your username"
              className="rounded-lg py-5 px-3 h-8 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="my-5 mx-5 flex flex-col gap-1">
            <label className="text-[16px] text-[#001452] font-medium">
              Email:
            </label>
            <input
              name="email"
              value={data.email}
              onChange={handleOnChange}
              type="text"
              placeholder="Enter your email"
              className="rounded-lg py-5 px-3 h-8 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="my-5 mx-5 flex flex-col gap-1">
            <label className="text-[16px] text-[#001452] font-medium">
              Password:
            </label>
            <input
              name="password"
              value={data.password}
              onChange={handleOnChange}
              type="password"
              placeholder="Enter your password"
              className="rounded-lg py-5 px-3 h-8 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="my-5 mx-5 flex flex-col gap-1">
            <label className="text-[16px] text-[#001452] font-medium">
              Confirm password:
            </label>
            <input
              name="password"
              value={data.password}
              onChange={handleOnChange}
              type="password"
              placeholder="Enter your password"
              className="rounded-lg py-5 px-3 h-8 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex justify-center gap-2 py-4 mx-5">
            <button className="bg-[#9C6317] w-full text-white p-[10px] rounded-xl hover:bg-opacity-80">
              Sign up
            </button>
          </div>
        </div>

        <div className="mb-2">
          <span>Have an account?</span>
          <Link
            to={"/login"}
            className="text-[#9C6317] ml-2 hover:text-[#EC5E95] cursor-pointer"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
