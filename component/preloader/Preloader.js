import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoaded(true);
    });

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <div className={`preloader align-items-center justify-content-center ${isLoaded ? "loaded" : ""}`}>
      <span className="loader"></span>
    </div>
  ) : (
    null
  );
};

export default Preloader;
