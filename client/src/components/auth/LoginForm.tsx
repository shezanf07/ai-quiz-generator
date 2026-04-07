import FormInput from "../shared/FormInput";
import GoogleOAuthBtn from "./GoogleOAuthBtn";

export default function LoginForm() {


  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };



  return (
    <form noValidate
      onSubmit={(e) => handleSubmit(e.nativeEvent)}
      className="flex flex-col gap-6 w-full max-w-md"
    >

      <FormInput
        label="EMAIL"
        name="email"
        type="email"
        placeholder="scholar@university.edu"
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
        className="w-full bg-[#B28228] hover:bg-[#976E22] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] transition-colors mt-2"
      >
        Log in ➔
      </button>

      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-[#dfd8c9]" />

        <span className="mx-4 text-xs tracking-widest uppercase text-[#A19D92] font-semibold italic">
          or
        </span>

        <div className="flex-grow border-t border-[#dfd8c9]" />
      </div>

      <GoogleOAuthBtn />

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