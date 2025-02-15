import Loginform from "./login_form";

//server components
export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="w-[400px] mx-auto  ">
        <Loginform/>
      </div>
    </div>
  );
}
