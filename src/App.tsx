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
import { GradientProvider } from "./components/gradient";
import Preloader from "./components/preloader";
import PreloaderProvider from "./context/loaderContext";
import AnonymousChat from "./pages/anonymous";
import CreateRoom from "./pages/create_room";
import JoinRoom from "./pages/join_room";
import Whisperroom from "./pages/whisperroom";


function App() {
  return (
    <Router>
      <GradientProvider />
      <Routes>
        <Route element={<PreloaderProvider />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
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
      </Routes>
    </Router>
  );
}

export default App;
