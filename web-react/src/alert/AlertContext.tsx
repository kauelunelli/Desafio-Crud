import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

interface AlertContextProps {
  alerts: Alert[];
  addAlert: (message: string, type: AlertType) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, type: AlertType) => {
    const id = new Date().getTime();
    setAlerts((prev) => [...prev, { id, message, type }]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
