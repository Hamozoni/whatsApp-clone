import {RouterProvider,Outlet, createBrowserRouter} from 'react-router-dom';

import {
    Signin,
    Signup,
    Chats,
    Calls,
    Status,
    Channels,
    Settings,
    Profile 
} from './pages/index';

import ChatWindow from "./pages/chat/outlets/chatWindow/chatWindow";
import NoActiveChat from "./pages/chat/outlets/NoActiveChat"

import {
    StatusPostImage,
    StatusPostText,
    StatusPostVideo
} from "./pages/status/post/index";

import { Navbar } from './components/navbar/navbar';


import {
    Account,
    Chats as ChatSetting,
    Help ,
    MainSetting,
    Notifications,
    Privacy,
    Theme
} from "./pages/settings/outlets/index";
import StatusPreview from './pages/status/preivew/statusPreview';


const RootLayout = ()=> {
    return (
        <main className="flex flex-col gap-1 md:flex-row h-screen max-h-screen w-screen max-w-screen text-amber-50">
            <Navbar />
            <Outlet />
        </main>
    )
};


/* ---------------- Router Definition ---------------- */
const router = createBrowserRouter([
  {
    element: <RootLayout />, // Header/Nav always visible
    children: [
     {
        path: '/',
        element: <Chats />,
        children: [
          { index: true, element: <NoActiveChat /> },
          { path: ":contactId", element: <ChatWindow /> },
        ],
      },
      {
        path: "/chats",
        element: <Chats />,
        children: [
          { index: true, element: <NoActiveChat /> },
          { path: ":contactId", element: <ChatWindow /> },
        ],
      },
      { path: "/calls", element: <Calls /> },
      { path: "/status", element: <Status /> },
      { path: "/status/postVideo", element: <StatusPostVideo /> },
      { path: "/status/postImage", element: <StatusPostImage /> },
      { path: "/status/postText", element: <StatusPostText /> },
      { path: "/status/preview", element: <StatusPreview /> },
      { path: "/channels", element: <Channels /> },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          { index: true, element: <MainSetting /> },
          { path: "account", element: <Account /> },
          { path: "profile", element: <Profile isSettingPage={true}/> },
          { path: "chats", element: <ChatSetting /> },
          { path: "help", element: <Help /> },
          { path: "notifications", element: <Notifications /> },
          { path: "privacy", element: <Privacy /> },
          { path: "theme", element: <Theme /> },
        ],
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
]);

/* ---------------- App Component ---------------- */
export default function App() {
  return <RouterProvider router={router} />;
}