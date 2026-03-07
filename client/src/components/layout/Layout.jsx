import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatBot from "../chat/ChatBot";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
        <ChatBot />
      </div>
    </div>
  );
}

export default Layout;