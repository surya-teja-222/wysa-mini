import type { NextPage } from "next";
import Head from "next/head";
import login from "./../styles/login.module.css";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  // UseEffect to check if a user is logged in.
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      window.location.href = "/get-started";
    }
  }, []);

  // useeffect to maintain email , and password in localstorage
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // on form submit, store email in localstorage and redirect to get-started page
  // Since, this is a starter application, no server side validation is done.
  const handleSubmit = () => {
    const emailElem = (document.getElementById("email") as HTMLInputElement)
      .value;
    const passwordElem = (
      document.getElementById("password") as HTMLInputElement
    ).value;
    const err = document.getElementById("error") as HTMLDivElement;

    if (emailElem && passwordElem) {
      err.innerHTML = "";
      localStorage.setItem("email", emailElem);
      window.location.href = "/get-started";
    } else {
      // set error message
      err.innerHTML = "Please enter email and password";
    }
  };

  return (
    <div className={login.gradient + " h-[100vh] w-[100vw]"}>
      <Head>
        <title>Wysa - Login </title>
        <meta
          name="description"
          content="Wysa Mini Project by Surya Teja Reddy "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        aria-label="header"
        className="h-[15%] w-full flex justify-between px-6"
      >
        <div className="flex flex-col  justify-center h-full">
          <img src="/wysa_logo.png" alt="Wysa" className="w-fit" />
        </div>
        <div className="flex flex-col  justify-center h-full">
          <div className="flex gap-7">
            <div className="font-semibold font-sans text-lg hover:underline cursor-pointer p-2">
              <a href="#">Meet Wysa</a>
            </div>
            <div className="font-semibold font-sans text-lg hover:underline cursor-pointer p-2">
              <a href="#">For Individuals</a>
            </div>
            <div className="font-semibold font-sans text-lg hover:underline cursor-pointer p-2">
              <a href="#">For Employers</a>
            </div>
            <div className="font-semibold font-sans text-lg hover:underline cursor-pointer p-2">
              <a href="#">Does it Work</a>
            </div>
            <div className="font-semibold font-sans text-lg hover:underline cursor-pointer p-2">
              <a href="#">About Us</a>
            </div>
            <div
              aria-label="button"
              className="font-semibold font-sans text-lg cursor-pointer border-black border-2 rounded-full p-2"
            >
              <a href="#login">Get Started</a>
            </div>
          </div>
        </div>
      </div>

      <main role={"main"} className="h-[85%]  relative">
        <div className="z-[-1] h-full w-full absolute flex justify-around">
          <img src="/l1.svg" className="h-1/2" alt="" />
          <div className="h-full flex flex-col justify-end">
            <img src="/l2.svg" alt="" className="h-3/5" />
          </div>
        </div>
        <div className="z-10 h-full w-full grid place-items-center">
          <div className="h-[90%] w-[30%] bg-[#dbecfbe6] rounded-3xl shadow-lg flex flex-col gap-4">
            <div className="mt-10 w-full flex justify-center font-mono text-2xl font-bold">
              Login/Sign Up
            </div>
            <div className="mx-auto w-[80%] flex justify-center text-center font-sans text-sm">
              If you have an Account, enter your Details to Login,
              <br />
              If you are new here, enter your details to Signup.
            </div>

            <div
              id="login"
              className="flex flex-col gap-4 w-[80%] mx-auto mt-6"
            >
              <input
                className="outline-none text-base font-semibold py-2 px-4 rounded-xl bg-[#edf7ff] focus:border-[1px] border-[#81a9ff]"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email "
              />
              <input
                className="outline-none text-base font-semibold py-2 px-4 rounded-xl bg-[#edf7ff] focus:border-[1px] border-[#81a9ff]"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
              />
              <a href="#" className="text-sm hover:underline ">
                Having Trobule with Login?
              </a>
              <div className="text-sm text-red-700 " id="error"></div>
              <div
                onClick={handleSubmit}
                className="w-[80%] mx-auto bg-[#f9c883] py-3 cursor-pointer text-center rounded-lg"
              >
                {" "}
                SUBMIT
              </div>
            </div>
            <div className="mx-auto">- or sign in with Google -</div>
            <div className="mx-auto  text-center px-5 py-2 cursor-pointer justify-evenly flex gap-2 rounded-full border-black border-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-semibold">Google</p>
            </div>
          </div>
        </div>
      </main>

      <div aria-label="footer"></div>
    </div>
  );
};

export default Home;
