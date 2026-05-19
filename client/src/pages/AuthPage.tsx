// Auth page. It switches between login and register by route.
import AuthLayout from "../layouts/AuthLayout";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";


export default function () {
    const location = useLocation();
    // Same page is reused for both auth routes.
    const isLogin = location.pathname === "/login";
    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto">

                <div className="flex items-center gap-6 mb-10 border-b border-[#dfd8c9]">

                    <Link
                        to="/login"
                        className={`pb-3 text-sm font-bold tracking-widest ${isLogin ? 'text-primary border-b-[3px] border-primary' : 'text-[#A19D92] hover:text-card-foreground transition-colors border-b-[3px] border-transparent'}`}
                    >
                        Log in
                    </Link>


                    <Link
                        to="/register"
                        className={`pb-3 text-sm font-bold tracking-widest ${!isLogin ? 'text-primary border-b-[3px] border-primary' : 'text-[#A19D92] hover:text-card-foreground transition-colors border-b-[3px] border-transparent'}`}
                    >
                        Register
                    </Link>


                </div>

                {isLogin ? <LoginForm /> : <RegisterForm />}

            </div>
        </AuthLayout>
    );
}   
