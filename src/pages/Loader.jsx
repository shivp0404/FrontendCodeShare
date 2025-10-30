import React from "react";
import { motion } from "framer-motion";

const Loader = ({ text = "Loading...", size = 48 }) => {
  return (
    <div className="flex flex-col justify-center items-center py-10 space-y-3">
      <motion.div
        className="rounded-full border-t-4 border-blue-500 border-opacity-80"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <motion.span
        className="text-sm text-gray-500 font-medium tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.2,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default Loader;
