import axiosClient from "@/utils/axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ServerDown from "./server_down"

const ServerCheck = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    axiosClient
      .get("pages/health", { timeout: 3000 })
      .then(() => setOk(true))
      .catch(() => <ServerDown />);
  }, []);

  // Page blocked here
  if (!ok) {
    return <ServerDown />; // nothing else renders
  }

  // Page allowed
  return <Outlet />;
};


export default ServerCheck;