import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto ">

        <div className="flex items-center gap-6 mb-10 border-b border-[#dfd8c9]">
          <Link 
            to="/login"
            className={`pb-3 text-sm font-bold tracking-[0.1em] ${isLogin ? 'text-[#B28228] border-b-[3px] border-[#B28228]' : 'text-[#A19D92] hover:text-card-foreground transition-colors border-b-[3px] border-transparent'}`}
          >
            Log in
          </Link>


          <Link 
            to="/register"
            className={`pb-3 text-sm font-bold tracking-[0.1em] ${!isLogin ? 'text-[#B28228] border-b-[3px] border-[#B28228]' : 'text-[#A19D92] hover:text-card-foreground transition-colors border-b-[3px] border-transparent'}`}
          >
            Register
          </Link>

          
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </AuthLayout>
  );
}
