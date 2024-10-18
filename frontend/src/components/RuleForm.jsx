import React, { useState } from "react";
import axios from "axios";

const RuleForm = () => {
  const [ruleString, setRuleString] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/rules/create_rule",
        { rule_string: ruleString }
      );
      setMessage(`Rule created successfully: ${response.data.rule_string}`);
      setRuleString("");
    } catch (error) {
      setMessage("Error creating rule. Please try again.");
    }
  };

  return (
    <div className="rule-form">
      <h2>Create a Rule</h2>
      <form onSubmit={handleSubmit}>
        <label>Rule:</label>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          required
        />
        <button type="submit">Create Rule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RuleForm;
