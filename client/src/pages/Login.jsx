import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import { Form, redirect, Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Logged In successfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

function Login() {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "demoUser@gmail.com",
      password: "demouser",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a tour of the app");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn></SubmitBtn>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;
