import { useEffect, useRef, useState } from "react";
import Img1 from "../assets/images/main-1.png";
import Img2 from "../assets/images/main-2.png";
import Img3 from "../assets/images/main-3.png";
import Img4 from "../assets/images/main-4.png";
import Button from "components/Button";
import Seperator from "components/Seperator";
import InstaLogo from "../assets/images/main-instagram.png";
import Input from "components/Input";
import { AiFillFacebook } from "react-icons/ai";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "firebase.js";
import { Formik, Form } from "formik";
import { loginSchema } from "../validations/index";
import { useSelector } from "react-redux";

function Login() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();

  useEffect(() => {
    let images = ref.current.querySelectorAll("img"),
      total = images.length,
      current = 0;

    const imageSlider = () => {
      images[(current > 0 ? current : total) - 1].classList.add("opacity-0");
      images[current].classList.remove("opacity-0");
      current = current === total - 1 ? 0 : current + 1;
    };
    let interval = setInterval(imageSlider, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [ref]);
  if (user) {
    return <Navigate to={location.state?.return_url || "/"} replace={true} />;
  }
  const handleSubmit = async (values, actions) => {
    await login(values.username, values.password);
  };

  return (
    <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">
      <div className="hidden md:block w-[380px] h-[581px] bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
        <div
          className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
          ref={ref}
        >
          <img
            className="w-full h-full absolute top-0 left-0 opacity-100 transition-opacity duration-700 ease-linear"
            src={Img1}
          ></img>
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 ease-linear"
            src={Img2}
          ></img>
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 ease-linear"
            src={Img3}
          ></img>
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 ease-linear"
            src={Img4}
          ></img>
        </div>
      </div>
      <div className="w-[350px]  grid gap-y-3">
        <div className="bg-white border px-[40px] pt-16 pb-6">
          <Link to="/" className="flex justify-center mb-8">
            <img className="h-[51px]" src={InstaLogo}></img>
          </Link>

          <Formik
            validationSchema={loginSchema}
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty, values }) => (
              <Form className="grid gap-y-1.5">
                <Input
                  type="text"
                  name="username"
                  label="Phone number, username or email"
                />
                <Input type="password" name="password" label="Password" />

                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Log In
                </Button>
                <Seperator />
                <a
                  href="#"
                  className="flex justify-center mb-2.5 items-center gap-x-2 text-sm font-semibold text-facebook"
                >
                  <AiFillFacebook size={20} />
                  Log in with Facebook
                </a>
                <a
                  href="#"
                  className="text-xs flex items-center justify-center text-link"
                >
                  Forgot Password?
                </a>
              </Form>
            )}
          </Formik>
        </div>

        <div className="bg-white border p-4 text-sm text-center">
          Don't have an account ?{" "}
          <Link to="/auth/register" className="font-semibold text-brand">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
