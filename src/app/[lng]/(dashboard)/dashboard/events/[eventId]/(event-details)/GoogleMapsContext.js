import React, { createContext, useState, useEffect, useContext } from "react";

const GoogleMapsContext = createContext();

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};

export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

  return (
    <GoogleMapsContext.Provider value={isLoaded}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
