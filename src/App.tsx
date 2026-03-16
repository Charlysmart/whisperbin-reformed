import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Inbox = lazy(() => import("@/user/pages/inbox"));
const Login = lazy(() => import("@/pages/login"));
const Chat = lazy(() => import("@/user/pages/chat"));
const UserProfile = lazy(() => import("@/user/pages/userProfile"));
const SendMessage = lazy(() => import("@/user/pages/sendMessage"));
const Register = lazy(() => import("@/user/pages/register"));
const Verify = lazy(() => import("@/user/pages/verify"));
const Notification = lazy(() => import("@/user/pages/notification"));
const AnonymousChat = lazy(() => import("@/user/pages/anonymous"));
const CreateRoom = lazy(() => import("@/user/pages/create_room"));
const JoinRoom = lazy(() => import("@/user/pages/join_room"));
const Whisperroom = lazy(() => import("@/user/pages/whisperroom"));
const NotFound = lazy(() => import("@/components/not_found"));
const AdminDashboard = lazy(() => import("@/admin/pages/dashboard"));
const ForgotPassword = lazy(() => import("@/pages/forgot_password"))
const ResetPassword = lazy(() => import("@/pages/reset_password"))
const Home = lazy(() => import("@/home"));
import SidebarLayout from "@/user/layout/sidebarLayout";
import { GradientProvider } from "@/user/components/gradient";
import PreloaderProvider from "@/context/loaderContext";
import ServerCheck from "@/components/serverGate";
import UserAuthentication from "@/protected_routes/user_auth";
import Preloader from "@/components/preloader";
import AdminRegister from "@/admin/pages/register";
import Users from "@/admin/pages/users";
import AdminAuthentication from "@/protected_routes/admin_auth";
import VerifyPreloader from "./components/verify_preloader";


function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader />} >
        <GradientProvider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PreloaderProvider />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin_register" element={<AdminRegister />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route element={<ServerCheck />} >
              <Route element={<UserAuthentication />}>
                <Route element={<SidebarLayout />}>
                  <Route path="/user_profile" element={<UserProfile />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/send_message/:username?" element={<SendMessage />} />    
                  <Route path="/anonymous_messages" element={<AnonymousChat />} />
                  <Route path="/chat/:thread" element={<Chat />} />        
                  <Route path="/notifications" element={<Notification />} /> 
                  <Route path="/create_room"  element={<CreateRoom />} />
                  <Route path="/join_room"  element={<JoinRoom />} />
                  <Route path="whisperroom/:room_thread" element={<Whisperroom />} />
                  <Route element={<AdminAuthentication />}>
                    <Route path="/users"  element={<Users />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
