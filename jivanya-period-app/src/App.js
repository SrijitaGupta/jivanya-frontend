import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footerone";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Insight from "./pages/insight";
import Tracker from "./pages/tracker";
import PregnancyQuestion from "./pages/PregnancyQuestion";
import EndometriosisQuestions from "./pages/EndometriosisQuestion";
import PcosQuestions from "./pages/PcosQuestions";
import MensesScore from "./pages/MensesScore";
import Cervicalcancer from "./pages/cervicalcancer";
import Team from "./pages/Team";
import FAQSearch from "./pages/FAQSearch";
import Cramps from "./pages/cramps";
import Hormones from "./pages/Hormones";
import Bloombot from "./pages/bloombot"; // ✅ Added import
import AdvancedTest from "./pages/advanced-test"; // ✅ Added import
import ResetPassword from "./pages/reset-password"; // ✅ Added ResetPassword import

//import ValidOtp from "./pages/OTPverify"; // ✅ New import

import ProtectedRoute from "./pages/ProtectedRoute"; // ✅ Added import

import Logout from "./pages/logout"; // ✅ Added Logout import

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./styles/Navbar.css";

// ✅ New import for About page
import About from "./pages/About";

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const showHeader = [
    "/login",
    "/signup",
    "/dashboard",
    "/tracker",
    "/pregnancy-questions",
    "/endometriosis-questions",
    "/pcos-questions",
    "/menses-score",
    "/team",
    "/faq",
    "/insight",
    "/cramps",
    "/Hormones",
    "/cervical-cancer",
    "/bloom-bot", // ✅ Added path to show header/footer
    "/advanced-test", // ✅ Added path for advanced-test
    "/reset-password", // ✅ Added path for reset-password
    "/about", // ✅ Added path for about page
   // "/valid-otp", // ✅ Added path for ValidOtp
  ].includes(path);

  const showFooter = showHeader;

  return (
    <div className="App">
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="/insight" element={<Insight />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/pregnancy-questions" element={<PregnancyQuestion />} />
        <Route path="/endometriosis-questions" element={<EndometriosisQuestions />} />
        <Route path="/pcos-questions" element={<PcosQuestions />} />
        <Route path="/menses-score" element={<MensesScore />} />
        <Route path="/cervical-cancer" element={<Cervicalcancer />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<FAQSearch />} />
        <Route path="/cramps" element={<Cramps />} />
        <Route path="/Hormones" element={<Hormones />} />
        <Route path="/bloom-bot" element={<Bloombot />} /> {/* ✅ Added Bloombot route */}
        <Route path="/advanced-test" element={<AdvancedTest />} /> {/* ✅ Added AdvancedTest route */}
        <Route path="/reset-password" element={<ResetPassword />} /> {/* ✅ Added ResetPassword route */}
        <Route path="/logout" element={<Logout />} /> {/* ✅ Added Logout route */}
        <Route path="/about" element={<About />} /> {/* ✅ Added About route */}
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
