import React, { useEffect, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { addStatus } from "../../store/registration/ActiveSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.ActiveReducer.active);

  const active = status[status.length - 1]?.activestatus;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const navigator = useNavigate();
  const [Active, setActive] = useState(false);

  useEffect(() => {
    const isActive = localStorage.getItem("Active") === "true";
    setActive(isActive);
  }, [Active]);

  const navigation =
    active === true
      ? [
          { name: "Food List", href: "/" },
          { name: "AddItem", href: "/additem" },
        ]
      : [{ name: "Food List", href: "/" }];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  function handelLogout() {
    localStorage.removeItem("Active");
    dispatch(addStatus({ activestatus: false }));
    
    navigator("/");
  }

  return (
    <Disclosure
      as="nav"
      className="dark:bg-black dark:text-white text-black border-b-4 border-orange-500 dark:border-white bg-orange-400 "
    >
      <div className=" px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="text-4xl dark:text-white ">
            <BiFoodMenu />
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 lobster-font" id="nav">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 dark:text-white text-1xl"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-md font-medium text-slate-700 dark:text-white"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <button
              className="p-2 dark:bg-gray-200 bg-gray-800 dark:text-black text-white rounded-3xl "
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="hover:rotate-180 duration-300">
              {darkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}

              </div>
            </button>
            <Menu as="div" className="relative ml-3  permanent-marker-font ">
              {active === true ? (
                <div>
                  <Link>
                    <button
                      className="text-white bg-yellow-500 py-2 px-3 rounded-md hover:scale-110 transition  text-xl"
                      onClick={() => handelLogout()}
                    >
                      logout
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex">
                  <div>
                    <Link to="/login">
                      <button className="text-white bg-yellow-500 py-2 px-3 mx-2 rounded-md hover:scale-110 transition text-xl">
                        login
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/registration">
                      <button className="text-white bg-orange-500 py-2 px-3 rounded-md hover:scale-110 transition  text-xl">
                        register
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
