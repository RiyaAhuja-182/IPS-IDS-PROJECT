import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(
      (username === "admin" && password === "1234") ||
      (storedUser && username === storedUser.username && password === storedUser.password)
    ){
      navigate("/dashboard");
    }
    else{
      setError("Invalid Username or Password");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-96">

        <div className="flex items-center gap-2 mb-6 justify-center">
          <Shield className="text-cyan-400"/>
          <h2 className="text-xl font-semibold text-white">
            IDS / IPS Login
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg text-black font-semibold"
          >
            Login
          </button>

        </form>

        {/* Create Account Link */}

        <p className="text-sm text-center text-slate-400 mt-4">
          Don't have an account?{" "}
          <span
            onClick={()=>navigate("/signup")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>

    </div>

  );
}