import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function StartPage() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="w-3/5 bg-[#ffffdb] flex flex-col justify-center">
        <div className="flex flex-row gap-1 mx-5 mt-5 items-center">
          <div className="text-[#fe7600] font-bold text-[24px]">DeBUG</div>
          <div className="h-[15px] w-[15px] rounded-full bg-[#fe7600]"></div>
        </div>
        <div className="mx-5 mb-5 h-full flex items-center justify-center">
          <TypeAnimation
            sequence={[
              "You want to practice with Javascript?",
              1000,
              "You want to practice with CSS?",
              1000,
              "You want to practice with HTML?",
              1000,
              "We provide an applcation that satify all of them!\nWith Debug Group",
              1000,
            ]}
            speed={50}
            style={{
              fontSize: "1.5em",
              whiteSpace: "pre-wrap",
            }}
            repeat={Infinity}
          />
        </div>
      </div>
      <div className="w-2/5 bg-white flex flex-col justify-center items-center gap-10 mx-20">
        <div className="font-bold text-3xl">Get started</div>
        <div className="flex flex-row w-full gap-6">
          <button className="border min-h-[46px] w-1/2 rounded-3xl bg-[#1c4ed8] text-white">
            Login
          </button>
          <button className="border min-h-[46px] w-1/2 rounded-3xl bg-[#1c4ed8] text-white">
            Signup
          </button>
        </div>
        <div className="flex flex-row gap-1">
          <div>Or</div>
          <Link
            to={"/popular"}
            className="font-bold hover:text-red-500 cursor:pointer"
          >
            Try it first
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
