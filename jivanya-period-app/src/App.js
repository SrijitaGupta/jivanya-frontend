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
import MensesScore from "./pages/MensesScore"; // ✅ New import
import Cervicalcancer from "./pages/cervicalcancer";
import Team from "./pages/Team";
import FAQSearch from "./pages/FAQSearch"; // ✅ Import FAQSearch
import Cramps from "./pages/cramps"; // ✅ Import cramps.js (lowercase)
import Hormones from "./pages/Hormones";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  
} from "react-router-dom";
import "./styles/Navbar.css";

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
    "/cramps", // ✅ Show header/footer on cramps page
    "/Hormones",
    "/cervical-cancer",
  ].includes(path);

  const showFooter = showHeader;

  return (
    <div className="App">
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/pregnancy-questions" element={<PregnancyQuestion />} />
        <Route path="/endometriosis-questions" element={<EndometriosisQuestions />} />
        <Route path="/pcos-questions" element={<PcosQuestions />} />
        <Route path="/menses-score" element={<MensesScore />} />
        <Route path="/cervical-cancer" element={<Cervicalcancer />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<FAQSearch />} />
        <Route path="/cramps" element={<Cramps />} /> {/* ✅ Added route for cramps */}
        <Route path="/Hormones" element={<Hormones />} />
        
        {/* Optional: Redirect /insight to /cramps if you want cramps as insight */}
        {/* <Route path="/insight" element={<Navigate to="/cramps" replace />} /> */}
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
