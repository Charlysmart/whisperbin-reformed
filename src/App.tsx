import Inbox from "@/user/pages/inbox";
import Login from "@/user/pages/login";
import Chat from "@/user/pages/chat";
import UserProfile from "@/user/pages/userProfile";
import StatusFeed from "@/user/pages/statusFeed";
import SendMessage from "@/user/pages/sendMessage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "@/user/pages/register";
import SidebarLayout from "@/user/layout/sidebarLayout";
import Verify from "@/user/pages/verify";
import ViewStatus from "@/user/pages/viewStatus";
import Notification from "@/user/pages/notification";
import { GradientProvider } from "@/user/components/gradient";
import PreloaderProvider from "@/context/loaderContext";
import AnonymousChat from "@/user/pages/anonymous";
import CreateRoom from "@/user/pages/create_room";
import JoinRoom from "@/user/pages/join_room";
import Whisperroom from "@/user/pages/whisperroom";
import NotFound from "@/not_found";
import ServerDown from "@/components/server_down";
import ServerCheck from "@/components/serverGate";
import AdminDashboard from "./admin/dashboard";


function App() {
  return (
    <Router>
      <GradientProvider />
      <Routes>
        <Route element={<PreloaderProvider />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/server_down" element={<ServerDown />} />
          <Route element={<ServerCheck />} >
            <Route element={<SidebarLayout />}>
              <Route path="/" element={<StatusFeed />} />
              <Route path="/view_status" element={<ViewStatus />} />
              <Route path="/user_profile" element={<UserProfile />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/send_message/:username?" element={<SendMessage />} />    
              <Route path="/anonymous_messages" element={<AnonymousChat />} />
              <Route path="/chat/:thread" element={<Chat />} />        
              <Route path="/notifications" element={<Notification />} /> 
              <Route path="/create_room"  element={<CreateRoom />} />
              <Route path="/join_room"  element={<JoinRoom />} />
              <Route path="whisperroom/:room_thread" element={<Whisperroom />} />
            </Route>
          </Route>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
