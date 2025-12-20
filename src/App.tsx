import Inbox from "@/pages/inbox";
import Login from "@/pages/login";
import Chat from "@/pages/chat";
import UserProfile from "@/pages/userProfile";
import StatusFeed from "@/pages/statusFeed";
import SendMessage from "@/pages/sendMessage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "@/pages/register";
import SidebarLayout from "@/layout/sidebarLayout";
import Verify from "@/pages/verify";
import ViewStatus from "./pages/viewStatus";
import Notification from "./pages/notification";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Verify" element={<Verify />} />
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<StatusFeed />} />
          <Route path="/view_status" element={<ViewStatus />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/send_message" element={<SendMessage />} />        
          <Route path="/chat" element={<Chat />} />        
          <Route path="/notifications" element={<Notification />} />        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
