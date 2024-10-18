import React, { useState } from "react";
import axios from "axios";

function EvaluateRuleForm() {
  const [data, setData] = useState({ age: "", department: "", salary: "" });
  const [ruleString, setRuleString] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/rules/evaluate_rule", {
        rule_string: ruleString,
        data,
      })
      .then((response) => setResult(response.data.result))
      .catch((error) => console.error("Error evaluating rule:", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Rule String:
          <input
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            value={data.salary}
            onChange={(e) => setData({ ...data, salary: e.target.value })}
          />
        </label>
        <button type="submit">Evaluate</button>
      </form>

      {result !== null && <p>Result: {result ? "Eligible" : "Not Eligible"}</p>}
    </div>
  );
}

export default EvaluateRuleForm;
