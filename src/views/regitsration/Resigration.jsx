import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiFoodMenu } from "react-icons/bi";
import { PiArrowFatLineRightFill } from "react-icons/pi";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../store/registration/UserSlice";

export default function Resigration() {
  const [show, setShow] = useState(false);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("*name Required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email format"
        )
        .required("*email Required"),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,32}$/,
          "password must constain([A-Z][a-z][@!#$%*&][1-9])"
        )
        .min(8, "Invalid length")
        .required("*password Required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .max(20, "Must be 20 characters or less")
        .required("*confirm password Required"),
    }),
    onSubmit: (values) => {
      // console.log(values);

      dispatch(
        addUser({
          fname: values.firstName,
          email: values.email,
          password: values.password,
        })
      );
      navigator("/login");
    },
  });

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-l from-orange-400 to-orange-600 md:flex justify-center items-center">
        <div className="min-h-[500px] md:grid grid-cols-2 md:w-[1400px]  ">
          <div className=" md:col-span-1  text-white">
            <div className="text-9xl md:mx-40 pt-10 md:mt-20">
              <BiFoodMenu />
            </div>
            <div className="lg:text-7xl text-5xl md:text-center">
              Reciepe List
            </div>
            <div className="text-4xl ms-56 md:ms-44 md:mt-10 md:block hidden">
              Join Us
              <div className="text-8xl md:mx-60">
                <PiArrowFatLineRightFill />
              </div>
            </div>
          </div>
          <div className=" bg-white   col-span-1 md:rounded-l-[110px] ">
            <div className="text-3xl font-semibold text-slate-500 text-center mt-10 ">
              Register here
            </div>
            <div>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="mt-10 space-y-4 md:mx-10 relative"
              >
                <div>
                  <input
                    className=" md:w-[600px]  w-80   px-2 py-2 border-2 border-gray-300 rounded-md"
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    placeholder="Name"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-600 text-sm font-semibold">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    className=" md:w-[600px]  w-80  px-2 py-2 border-2 border-gray-300 rounded-md"
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm font-semibold">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div>
                  <div className=" md:w-[600px] w-80   border-2 border-gray-300 rounded-md flex items-center">
                    <input
                      className=" md:w-[550px] w-80 px-2 py-2 "
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="Password"
                    />{" "}
                    <div
                      className=" text-3xl"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? <IoIosEyeOff /> : <IoMdEye />}
                    </div>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 text-sm font-semibold">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    className="md:w-[600px] w-80  px-2 py-2 border-2 border-gray-300 rounded-md"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cpassword}
                    placeholder="Confirm Password"
                  />
                  {formik.touched.cpassword && formik.errors.cpassword ? (
                    <div className="text-red-600 text-sm font-semibold">
                      {formik.errors.cpassword}
                    </div>
                  ) : null}
                </div>
                <div className="text-center md:text-nowrap">
                  <button
                    className="bg-orange-500 py-2 px-4 font-semibold text-white rounded-2xl md:absolute right-3 "
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div>
                  Alredy Have account ?{" "}
                  <Link className="text-blue-600" to="/login">
                    {" "}
                    Login here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
