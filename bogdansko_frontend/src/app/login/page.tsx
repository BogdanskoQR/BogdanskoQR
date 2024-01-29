"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import React, { useState } from "react";
import "./LoginPage.css";
import { companyDetails } from "@/data/drinksData";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").min(2).max(50),
});

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(2).max(50),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").min(2).max(50),
});

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const handleLoginSubmit = (values: LoginFormValues) => {
    console.log("Login form values:", values);
    const loggedInCompany = companyDetails.find((company)=> company.email === values.email && company.password === values.password)
    if(loggedInCompany){
    router.push(`/dashboard/${loggedInCompany.id}`);
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
    console.log(loggedInCompany)
  };

  const handleSignUpSubmit = (values: RegisterFormValues) => {
    console.log("Sign up form values:", values);
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

        <div className="login">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleSignUpSubmit}
            validationSchema={registerSchema}
          >
            <Form>
              <label htmlFor="chk" aria-hidden="true">
                Sign Up
              </label>
              <Field type="text" name="name" placeholder="User name" required />
              <ErrorMessage name="name" component="div" className="error" />
              <Field type="email" name="email" placeholder="Email" required />
              <ErrorMessage name="email" component="div" className="error" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage name="password" component="div" className="error" />
              <button type="submit">Sign up</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
