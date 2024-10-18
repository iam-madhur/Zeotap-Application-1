import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RulesList() {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/rules")
      .then((response) => setRules(response.data))
      .catch((error) => setError("Error fetching rules"));
  }, []);

  return (
    <div>
      <h2>Rule List</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>
            {rule.rule_string}
            <Link to={`/modify/${rule.id}`}>
              <button>Modify</button>
            </Link>
            <Link to={`/evaluate`}>
              <button>Evaluate</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RulesList;
