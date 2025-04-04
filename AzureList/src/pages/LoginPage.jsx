import logo from "../assets/logo.png";
import Credentials from "../components/credentials";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-Primary flex justify-center items-center flex-row max-lg:flex-row max-md:flex-col">
      <img
        src={logo}
        className="h-[438px] w-[438px] max-lg:w-[438px] max-lg:h-[438px] max-md:w-[300px] max-md:h-[300px] "
      />
      <Credentials />
    </div>
  );
}
