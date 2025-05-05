import DashBoard from "./pages/dashBoard/DashBoard";
import LandingPage from "./pages/landingPage/LandingPage";
import Layout from "@/components/layOut/LayOut";
import NoPage from "./pages/noFound/NoPage";
import Signin from "./pages/signIn/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signUp/SignUp";
import PageTitleUpdater from "./PageTitleUpdater";
import Accounts from "./pages/dashBoard/accounts/Accounts";
import ChartPage from "./pages/dashBoard/ChartsPage/ChartPage";
import ProfilePage from "./pages/ProfilePage/Profile";
import { useAuth } from "./hooks/AuthContext";
import PricingPage from "./pages/PricingPage/PricingPage";
// import Messanger from "./pages/messenger/app";
function App() {
  const { auth } = useAuth();
  return (
    <div className="">
      {/* <PageTitleUpdater /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="Pricing" element={<PricingPage />} />

          {auth && <Route path="Profile/:id" element={<ProfilePage />} />}
        </Route>
        {auth && (
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<Navigate to="charts" />} />
            <Route path="charts" element={<ChartPage />} />
            <Route path="account" element={<Accounts />} />
            {/* <Route path="Support" element={<Messanger />} /> */}
          </Route>
        )}

        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
