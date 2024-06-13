import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useSession } from "next-auth/react"


export default function Navbar() {
  
    const [logged, setlogged] = useState(false);
    const [candidate, setCandidateUser] = useState(false);
    const { data: session, status } = useSession();
  
    // State for OptionModal
    const [showOption, setShowOption] = useState(false);
  
    // States for Login and Registration Modals
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
  

    // Login and Registration Modal Logic
    const flipToRegisterModal = () => {
      setShowLoginModal(false);
      setShowRegisterModal(true);
    };
  
    useEffect(() => {
      if (status === "authenticated") {
      let userType = window.localStorage.getItem("usertype");
      console.log(userType);
      if (userType === "CANDIDATE") {
        setCandidateUser(true);
      }
    }
    }, [status]);
  
    return (
      <div className="relative top-0 z-50 navbar flex">
        {/* Login Modal */}
  
        {showLoginModal && (
          <LoginModal
            closeModal={() => setShowLoginModal(false)}
            flipToRegisterModal={flipToRegisterModal}
          />
        )}
  
        {/* Register Modal */}
        {showRegisterModal && (
          <RegisterModal closeModal={() => setShowRegisterModal(false)} />
        )}
  
        {/* Option Modal  */}
  
        {showOption && <MainMenuModal closeModal={() => setShowOption(false)} />}
  
        {/* Navbar */}
  
        <header className="h-[80px] max-w-[1220px] w-[70%] mx-auto top-0 left-0 right-0 bottom-0 relative transition-top transition transition-duration-[0.4s] z-40">
          <div className="relative h-full w-full">
            <section className="flex h-full justify-between shadow-lg 34em:h-[80px] 34em:px-[2rem] w-full">
              <div className="flex h-full relative ml-16 mt-1 font-extrabold text-6xl text-orange-700">
                <Link href="/">
                    Recra
                </Link>
              </div>
  
              <div className="text-neutral-500 m-[1em] mr-[2em] bg-black w-[0.51px] flex relative opacity-20 transition-opacity after:content-none after:block after:h-1/2 after:w-full bg-current after:opacity-20">
                {" "}
              </div>
  
  
              {/* Navbar icons */}
              <div className="h-full flex relative flex-row basis-[150px] justify-end">
                <ul className="m-0 p-0 flex relative h-full flex-row pl-[40px] items-center justify-end">
                 
                  {/* Login Button */}
                  <li className="text-center items-center flex relative h-full ml-[0.5em] mr-[0.5em] justify-center">
                    
                    <button
                      className="border-0 border-r-0 outline-0 p-0 bg-transparent text-inherit cursor-pointer"
                      onClick={() => {
                        if (candidate) {
                          // Redirect to profile page
                          window.location.href = "/profile";
                        } else {
                          setShowLoginModal(true);
                        }
                      }}
                    >
                      <AiOutlineUser size={28} />
                    </button>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          {/* inner nav */}
        </header>
      </div>
    );
  }