import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/Navbar/Navbar";
import "./login.scss";
import { useEffect } from "react";
import { Navigate } from "react-router";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      return <Navigate to="/" />;
    }
  }, []);
  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;
