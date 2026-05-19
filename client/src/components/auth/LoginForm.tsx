// Login form. It signs in a creator and stores the token.
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../shared/FormInput";
import GoogleAuthBtn from "./GoogleAuthBtn";
import { authApi, setAuthToken } from "../../services/api";
import LoadingOverlay from "../shared/LoadingOverlay";


export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        // Read values directly from the submitted form.
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Backend returns the token used by protected routes.
            const data = await authApi.login({ email, password });
            setAuthToken(data.token);
            localStorage.setItem('user_name', data.name || 'Scholar');


            // Send user back to the page they tried to open, or dashboard.
            const from = (location.state as any)?.from;
            const redirectUrl = from ? `${from.pathname}${from.search || ''}` : "/dashboard";
            navigate(redirectUrl);

        } catch (err: any) {
            setErrorMsg(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md"
        >
            <LoadingOverlay active={loading} message="Verifying credentials..." submessage="Establishing a secure session..." />
            {errorMsg && <div className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded">{errorMsg}</div>}

            <FormInput
                label="EMAIL"
                name="email"
                type="email"
                placeholder="student@university.edu"
                required
            />

            <FormInput
                label="PASSWORD"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                rightLabel="Forgot password?"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] transition-colors mt-2"
            >
                {loading ? "Logging in..." : "Log in ➔"}
            </button>

            <div className="relative flex items-center py-4">
                <div className="grow border-t border-[#dfd8c9]" />

                <span className="mx-4 text-xs tracking-widest uppercase text-[#A19D92] font-semibold italic">
                    or
                </span>

                <div className="grow border-t border-[#dfd8c9]" />
            </div>

            <GoogleAuthBtn />

            <p className="text-[9px] text-center text-[#A19D92] font-semibold uppercase tracking-wider mt-4 leading-[1.6] max-w-xs mx-auto">
                By signing up, you agree to our{" "}
                <a href="/terms" className="underline hover:text-gray-600">
                    Terms of Service
                </a>{" "}
                &{" "}
                <a href="/privacy" className="underline hover:text-gray-600">
                    Privacy Policy
                </a>
            </p>



        </form>
    );
}
