import axiosClient from "@/utils/axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ServerDown from "./server_down";
import { usePreloader } from "@/context/loaderContext";

const ServerCheck = () => {
  const [ok, setOk] = useState(null);
  const { startLoading, stopLoading } = usePreloader();

  useEffect(() => {
    startLoading();
    const checkServer = async () => {
      startLoading();
      try {
        await axiosClient.get("pages/health", { timeout: 3000 });
        setOk(true);
      } catch (error) {
        setOk(false);
      } finally {
        stopLoading();
      }
  };

  checkServer();
  }, []);

  // Page blocked here
  if (ok === null) return null;
  
  if (ok === false) {
    return <ServerDown />; // nothing else renders
  }

  // Page allowed
  return <Outlet />;
};


export default ServerCheck;