import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RuleForm from "./components/RuleForm";
import RulesList from "./components/RulesList";
import EvaluateForm from "./components/EvaluateForm";
import ModifyRuleForm from "./components/ModifyRuleForm";

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Rule Engine Application</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Create Rule</Link>
            </li>
            <li>
              <Link to="/rules">View Rules</Link>
            </li>
            <li>
              <Link to="/evaluate">Evaluate Rule</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<RuleForm />} />
          <Route path="/rules" element={<RulesList />} />
          <Route path="/evaluate" element={<EvaluateForm />} />
          <Route path="/modify/:id" element={<ModifyRuleForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
