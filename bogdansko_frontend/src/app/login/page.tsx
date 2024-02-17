"use client";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import "./LoginPage.css";
import axios from 'axios';
import { BASE_URL } from "@/Components/Types/types";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").min(2).max(50),
});

export default function Page() {
  const loginUser = async (data:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);
      console.log('Post request successful:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error making post request:', error);
      throw error; 
    }
  };

  const router = useRouter();

  const handleLoginSubmit = async (values:any) => {
    try {
      const loggedInUser = await loginUser(values);
      if (loggedInUser) {
        router.push(`/dashboard/${loggedInUser.id}`);
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
      } else {
        notification.error({
          message: "Invalid Credentials",
          description: "Please enter correct email and password.",
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="mainWrapper">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <Form>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <Field type="email" name="email" placeholder="Email" required />
              <ErrorMessage name="email" component="div" className="error" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage name="password" component="div" className="error" />
              <button type="submit">Login</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
