import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function CreateAccount() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    const user = { username, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully!");

    navigate("/");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-96">

        <div className="flex items-center gap-2 mb-6 justify-center">
          <Shield className="text-cyan-400"/>
          <h2 className="text-xl font-semibold text-white">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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
            Create Account
          </button>

        </form>

        <p className="text-sm text-center text-slate-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={()=>navigate("/")}
            className="text-cyan-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );
}