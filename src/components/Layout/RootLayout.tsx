import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Notification from "../../notification/Notification";

export default function RootLayout() {
  return (
    <div>
      <Notification />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
