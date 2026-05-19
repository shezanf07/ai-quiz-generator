import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi, setAuthToken } from "../../services/api";
import LoadingOverlay from "../shared/LoadingOverlay";


export default function GoogleOAuthBtn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialResponse = async (response: any) => {
    try {
      setLoading(true);
      setError("");
      const idToken = response.credential;
      const data = await authApi.googleLogin({ idToken });
      
      setAuthToken(data.token);
      localStorage.setItem("user_name", data.name || "Scholar");
      
      // Redirect to original page or dashboard
      const from = (location.state as any)?.from;
      const redirectUrl = from ? `${from.pathname}${from.search || ''}` : "/dashboard";
      navigate(redirectUrl);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Google Sign-In failed");
    }
  };

  const [clientId, setClientId] = useState("");

  useEffect(() => {
    authApi.getConfig()
      .then((data: any) => {
        if (data.googleClientId) {
          setClientId(data.googleClientId);
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const google = (window as any).google;
          if (google && google.accounts) {
            google.accounts.id.initialize({
              client_id: data.googleClientId,
              callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
              document.getElementById("google-signin-btn"),
              { 
                theme: "outline", 
                size: "large", 
                width: 320, 
                text: "continue_with" 
              }
            );
          }
        }
      })
      .catch((err: any) => {
        console.error("Failed to load Google Auth config", err);
      });
  }, []);


  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <LoadingOverlay active={loading} message="Authenticating with Google..." submessage="Establishing a secure session..." />
      {error && <div className="text-red-500 text-xs font-semibold">{error}</div>}
      <div id="google-signin-btn" className="w-full flex justify-center py-2"></div>


      //Developer Error Message
      {!clientId && (
        <span className="text-[9px] text-amber-500/80 font-bold uppercase tracking-wider mt-1 text-center max-w-xs leading-normal">
          {/* ⚠️ Configure VITE_GOOGLE_CLIENT_ID in your server/.env file to activate Google Sign-In */}
        </span>
      )}
    </div>
  );
}