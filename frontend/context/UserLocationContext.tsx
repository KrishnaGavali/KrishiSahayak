"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface locationDataType {
  latitude: number;
  longitude: number;
}

interface UserLocationContextType {
  location: locationDataType | null;
  setLocation: React.Dispatch<React.SetStateAction<locationDataType | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const userLocationContext = createContext<UserLocationContextType | null>(null);

interface UserLocationProviderProps {
  children: ReactNode;
}

export const UserLocationProvider = ({
  children,
}: UserLocationProviderProps) => {
  const [location, setLocation] = useState<locationDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const value: UserLocationContextType = {
    location,
    setLocation,
    error,
    setError,
    loading,
    setLoading,
  };

  return (
    <userLocationContext.Provider value={value}>
      {children}
    </userLocationContext.Provider>
  );
};

export const useUserLocation = () => {
  const context = useContext(userLocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within UserLocationProvider");
  }
  return context;
};

export const requestUserLocation = () => {
  if (!navigator.geolocation) {
    return Promise.reject("Geolocation is not supported by your browser");
  }

  return new Promise<locationDataType>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      }
    );
  });
};

export default userLocationContext;
