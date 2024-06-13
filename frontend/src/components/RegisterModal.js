import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import axios from "axios";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

/**
 * @description Registration Modal used in Navbar.js
 */
export default function RegisterModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);

  const [registered, setRegistered] = useState(false);

  const onSubmit = async (data) => {
    let { userType, ...credentials } = data;
    let registrationLink
    console.log(userType)
    if (userType == "Candidate") {
        registrationLink = "http://127.0.0.1:8000/api/register/candidate/"
    } else {
        registrationLink = "http://127.0.0.1:8000/api/register/company/"
    }
    
    console.log(registrationLink)
    const response = await fetch(registrationLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const res = await response.json();
    console.log(res);
    toast.success("Registered successfully, now Login to continue");
    Router.reload();
  };


  useEffect(() => {
    //redirects
    if (registered) {
      Router.push("/");
    }
  });

  return (
    <div className="transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full flex justify-center bg-opacity-90 bg-black fixed z-50 transition-all">
          <div className="w-[25rem] h-[30rem] mx-auto z-50 fixed mt-10 bg-white shadow-white border shadow-sm p-0 flex flex-col justify-items-start">
            {/* Cross button */}
            <button
              className="absolute top-0 right-0 h-8 w-8"
              onClick={closeModal}
            >
              <div className="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
              <div className="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
            </button>

            <div className="w-2/3 h-[1px] mx-auto bg-slate-700 opacity-20 mb-4"></div>
            <label className="mx-auto text-lg font-merriweather mb-1 mt-8">
              Enter your username
            </label>
            <input
              name="username"
              autoFocus
              {...register("username", {
                required: "Please enter a unique username",
              })}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>

            <label className="mx-auto text-lg font-merriweather mb-1 mt-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>
            <label className="mx-auto text-lg font-merriweather mb-1 mt-2">
              User Type
            </label>
            <select
              name="userType"
              {...register("userType", { required: true })}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            >
              <option value="">Select user type</option>
              <option value="Candidate">Candidate</option>
              <option value="Company">Company</option>
            </select>

            <button className="px-4 py-2 border-2 m-auto border-gray-900 pointer-events-auto">
              Sign up
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
