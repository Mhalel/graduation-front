import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

const pageTitles = {
  "/": "Home",
  "/signin": "Sign In",
  "/signup": "Sign Up", // lowercase!
  "/dashboard": "Dashboard",
  "/dashboard/account": "Account",
};

export default function PageTitleUpdater() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname.toLowerCase()] || "Page Not Found";

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
