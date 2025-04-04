import React, { useState } from "react";
import picture from "../assets/DProfPic.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const name = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    setShowLoader(true); // Show loader
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    }, 2000);
  };

  return (
    <>
      {/* Loader animation */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="logout-loader"
            className="fixed inset-0 bg-Primary z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={logo}
              alt="Logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your original layout untouched */}
      <div className="bg-Primary left-0 flex h-full w-[20%]">
        <div className="flex mt-14 justify-center w-full">
          <div className="flex-col flex">
            <img
              src={picture}
              className="h-[187px] transition-all duration-300 w-[187px] max-lg:h-[100px] max-lg:w-[100px] max-sm:h-[50px] max-sm:w-[50px]"
              alt="Profile"
            />
            <div className="text-center font-semibold text-[16px] text-white mt-2">
              {name}
            </div>
          </div>

          {/* 🔥 Just this button altered */}
          <button
            onClick={handleLogout}
            className="text-center font-semibold cursor-pointer text-[16px] absolute bottom-0 text-white mb-5"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
