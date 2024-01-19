"use client";
import { useRouter } from "next/navigation";
import "./LoginPage.css";

export default function Page() {
  const router = useRouter();
  const handleOnLogin = () => {
    router.push("/dashboard");
  };
  return (
    <div className="mainWrapper">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button onClick={handleOnLogin}>Login</button>

          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign Up
            </label>

            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button>Sign up</button>

          </form>
        </div>
      </div>
    </div>
  );
}
