import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth.service";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">
          Portfolio CMS
        </h1>

        <div className="mb-4">
          <label className="mb-2 block">Email</label>

          <input
            type="email"
            className="w-full rounded border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block">Password</label>

          <input
            type="password"
            className="w-full rounded border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}