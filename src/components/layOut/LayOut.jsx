import { Outlet } from "react-router-dom";
import Header from "../header/Header";

// import { Helmet } from "react-helmet";
// import ChatSupport from "../chatSupport/ChatSupport";

export default function LayOut() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
