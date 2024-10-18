import React, { useState } from "react";
import axios from "axios";

function CombineRulesForm({ rules }) {
  const [selectedRules, setSelectedRules] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/rules/combine_rules", {
        rules: selectedRules,
      })
      .then((response) => {
        console.log("Combined AST:", response.data.combinedAst);
      })
      .catch((error) => console.error("Error combining rules:", error));
  };

  const handleSelectRule = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Select rules to combine</h3>
      {rules.map((rule) => (
        <div key={rule.id}>
          <input
            type="checkbox"
            onChange={() => handleSelectRule(rule.id)}
            checked={selectedRules.includes(rule.id)}
          />
          {rule.rule_string}
        </div>
      ))}
      <button type="submit">Combine Rules</button>
    </form>
  );
}

export default CombineRulesForm;
