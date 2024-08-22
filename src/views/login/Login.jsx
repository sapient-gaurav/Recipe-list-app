import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiFoodMenu } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addStatus } from "../../store/registration/ActiveSlice";

export default function Login() {
  const [show, setShow] = useState(false);

  const disptach = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.UserReducer.userData);
  function handelLogin(values) {
    // console.log(values);
    let loginUser = null;
    for (let i = 0; i < user.length; i++) {
      if (
        values.email === user[i].email &&
        values.password === user[i].password
      ) {
        console.log("login success");
        loginUser = user[i];
        navigator("/");
      }
    }
    if (!loginUser) {
      alert("credential are invalid");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email format"
        )
        .required("*Required"),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,32}$/,
          "password must constain([A-Z][a-z][@!#$%*&][1-9])"
        )
        .min(8, "Invalid length")
        .required("*Required"),
    }),
    onSubmit: (values) => {
      // console.log(values);

      disptach(addStatus({ activestatus: true }));

      handelLogin(values);
    },
  });
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-l from-orange-300 to-orange-700 md:flex justify-center pt-32 ">
        <div className="md:w-[600px] h-[490px] md:mt-40 hidden md:block ">
          <img
            className="object-cover h-full"
            src="./delicious-indian-food-tray.jpg"
            alt=""
          />
        </div>
        <div className=" md:w-[600px] md:h-[490px]  h-[540px] md:mt-40 bg-orange-700 order-1 md:order-2">
          <div className="text-center text-white">
            <div className="text-8xl md:ms-64 ms-24 pt-5 ">
              {" "}
              <BiFoodMenu />
            </div>
            {/* <div className="text-3xl font-bold">Recipe List</div> */}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center text-white">
              Account Login
            </h1>
            <form action="" onSubmit={formik.handleSubmit} className="mt-10">
              <div>
                <div className="flex justify-center mb-3">
                  <div className="flex bg-slate-200 text-white bg-opacity-30 rounded-md w-10/12 md:w-auto">
                    <div className="text-xl inline-flex items-center justify-center p-2 border-r border-white">
                      <FaUserLarge />
                    </div>
                    <input
                      className="md:w-[300px]  px-2 py-2 bg-transparent text-slate-900 "
                      type="Email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>{" "}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-950  font-semibold md:ms-28 ">
                  {formik.errors.email}
                </div>
              ) : null}
              <div>
                <div className="flex justify-center">
                  <div className="flex bg-slate-200 text-white bg-opacity-30 rounded-md w-10/12 md:w-auto">
                    <div className="text-xl inline-flex items-center justify-center p-2 border-r border-white">
                      <RiLockPasswordFill />
                    </div>
                    <div className="flex items-center ">
                      <input
                        className="md:w-[250px] w-9/12  px-2 py-2 bg-transparent text-slate-900 "
                        type={show ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Password"
                      />{" "}
                      <div
                        className=" text-3xl mx-3"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        {show ? <IoIosEyeOff /> : <IoMdEye />}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-950  font-semibold md:ms-28">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="text-center mt-10">
                <button
                  className="md:w-[300px] px-2 py-2 bg-orange-950 text-white  rounded-md"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <h1 className="text-center text-clack text-xl">
                -------------------------------
              </h1>
              <h1 className="text-center">
                not register?{" "}
                <Link
                  className="text-blue-900 font-semibold"
                  to="/registration"
                >
                  Register
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
