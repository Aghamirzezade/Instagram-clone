import { useRef } from "react";
import Button from "components/Button";
import Seperator from "components/Seperator";
import InstaLogo from "../assets/images/main-instagram.png";
import Input from "components/Input";
import { AiFillFacebook } from "react-icons/ai";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register } from "firebase.js";
import { Formik, Form } from "formik";
import { registerSchema } from "../validations/index";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();

  const handleSubmit = async (values, actions) => {
   const response= await register(values);
    if(response){
    navigate(location.state?.return_url || "/", {
      replace: true,
    })}
  };

  return (
    <div className="w-[350px] grid gap-y-3">
      <div className="bg-white border px-[40px] pt-8 pb-6">
        <Link to="/" className="flex justify-center mb-4 ">
          <img className="h-[51px]" src={InstaLogo}></img>
        </Link>
        <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
          Sign up to see photos and videos from your friends.
        </p>
        <Button>
          <AiFillFacebook size={20} />
          Log in with Facebook
        </Button>
        <Seperator />
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            email: "",
            full_name: "",
            username: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form className="grid gap-y-1.5">
              <Input type="text" name="email" label="Email" />
              <Input type="text" name="full_name" label="Full Name" />
              <Input type="text" name="username" label="Username" />
              <Input type="password" name="password" label="Password" />
              <p className="text-xs text-[#8e8e8e] py-2">
                People who use our service may have uploaded your contact
                information to Instagram. <a className="font-semibold" href="">Read more</a>
                <br /> <br />
                By registering, you agree to
                our <a className="font-semibold" href="">Terms</a> , <a className="font-semibold" href="">Privacy Policy</a> and <a className="font-semibold" href="">Cookies Policy</a> .
              </p>
              <Button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-white border p-4 text-sm text-center">
        Have an account ?{" "}
        <Link to='/auth/login' className="font-semibold text-brand">
          Log in
        </Link>
      </div>
    </div>
  );
}
export default Register;
