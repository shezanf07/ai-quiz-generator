import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../shared/FormInput";
import GoogleAuthBtn from "./GoogleAuthBtn";
import { authApi, setAuthToken } from "../../services/api";
import LoadingOverlay from "../shared/LoadingOverlay";
export default function RegisterForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
            const data = await authApi.register({ name, email, password });
            setAuthToken(data.token);
            localStorage.setItem('user_name', data.name || 'Scholar');

            // Redirect to original page or dashboard
            const from = (location.state as any)?.from;
            const redirectUrl = from ? `${from.pathname}${from.search || ''}` : "/dashboard";
            navigate(redirectUrl);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md"
        >
            <LoadingOverlay active={loading} message="Creating your scholar account..." submessage="Setting up your academic workspace..." />
            {error && <div className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded">{error}</div>}

            <FormInput
                label="FULL NAME"
                name="name"
                type="text"
                placeholder="Your Name"
                required
            />

            <FormInput
                label="EMAIL"
                name="email"
                type="email"
                placeholder="student@university.edu"
                required
            />

            <div className="flex gap-4">

                <FormInput
                    label="PASSWORD"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                />

                <FormInput
                    label="CONFIRM"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                />

            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] transition-colors mt-2"
            >
                {loading ? "Creating..." : "Create Account ➔"}
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
                </a>

                {" "} & {" "}

                <a href="/privacy" className="underline hover:text-gray-600">
                    Privacy Policy
                </a>

            </p>

        </form>
    );
}