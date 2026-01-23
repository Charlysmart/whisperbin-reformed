import axiosClient from "@/utils/axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ServerDown from "@/components/server_down";

const ServerCheck = () => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const path = useLocation().pathname

  useEffect(() => {
    axiosClient
      .get("pages/health", { timeout: 3000 })
      .then(() => setOk(true))
      .catch(() => <ServerCheck />);
  }, []);

  // Page blocked here
  if (!ok) {
    return <ServerDown />; // nothing else renders
  }

  // Page allowed
  return <Outlet />;
};


export default ServerCheck;