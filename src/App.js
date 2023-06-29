import './App.css';
import React, { useState, useEffect } from 'react'
import Header from './Components/Header';
import Body from './Components/Body';
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";


const rotateDuration = 4 * 1000;
const pauseDuration = 0.3 * 60 * 1000;

export default function App() {
  const [isRotating, setIsRotating] = useState(true);
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setIsRotating(false);
      }, rotateDuration);
    }, rotateDuration + pauseDuration);

    return () => clearInterval(rotateInterval);
  }, []);
  return (
    <div className="container">
      {/* <h1 className="container-title">TODO LIST</h1> */}
      <motion.h1
        className="container-title"
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        animate={{
          rotate: isRotating ? 360 : 0,
          transition: { duration: rotateDuration / 1000, ease: "linear" },
        }}
      >
        <span className="rainbow-effect">T</span>
        <span className="rainbow-effect">O</span>
        <span className="rainbow-effect">D</span>
        <span className="rainbow-effect mg-right">O</span>
        <span className="rainbow-effect">L</span>
        <span className="rainbow-effect">I</span>
        <span className="rainbow-effect">S</span>
        <span className="rainbow-effect">T</span>
      </motion.h1>
      <div className="header">
        <Header></Header>
        <Body></Body>
      </div>
      <Toaster position="top-right" toastOptions={{ style: { fontSize: "20px", }, }} />
    </div>
  )
}


