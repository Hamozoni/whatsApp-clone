import {RouterProvider,Outlet, createBrowserRouter} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';


import {
    Chats,
    Calls,
    Status,
    Channels,
    Settings,
    Profile,
    Auth,

} from './pages';

import Signin from './pages/auth/outlet/signin';
import Signup from './pages/auth/outlet/signup';

import ChatWindow from "./pages/chat/outlets/chatWindow/chatWindow";
import NoActiveChat from "./pages/chat/outlets/NoActiveChat"

import {
    StatusPostImage,
    StatusPostText,
    StatusPostVideo
} from "./pages/status/post";

import { Navbar } from './components/navbar/navbar';


import {
    Account,
    Chats as ChatSetting,
    Help ,
    MainSetting,
    Notifications,
    Privacy,
    Theme,
    KeyboardShorts
} from "./pages/settings/outlets/";

import StatusPreview from './pages/status/preivew/statusPreview';

import { 
  CallContextProvider, 
  ChatsContextProvider, 
  SettingsContextProvider, 
  UserContextProvider 
} from './contexts';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry : 1,
      staleTime: 5 * 60 * 1000
    }
  }
})

const RootLayout = ()=> {
    return (
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-col gap-1 md:flex-row h-screen max-h-screen w-screen max-w-screen text-amber-50">
                <UserContextProvider>
                    <SettingsContextProvider>

                        <ChatsContextProvider >
                          <CallContextProvider >
                              <Navbar />
                              <Outlet />
                          </CallContextProvider>

                        </ChatsContextProvider>
                    </SettingsContextProvider>
                </UserContextProvider>
        </main>
      </QueryClientProvider>
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
          { path: "keyboard shortcuts", element: <KeyboardShorts /> },
        ],
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/auth", 
    element: <Auth /> ,
    children: [
      {index: true, path: "signup", element: <Signup/> },
      { path: "signin", element: <Signin /> },
    ]
  },
]);

/* ---------------- App Component ---------------- */
export default function App() {
  return <RouterProvider router={router} />;
}