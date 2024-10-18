import React, { useState } from "react";
import axios from "axios";

function ModifyRuleForm() {
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/rules/create_rule", {
        rule_string: ruleString,
      })
      .then((response) => {
        console.log("Rule created:", response.data);
      })
      .catch((error) => console.error("Error creating rule:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rule String:
        <textarea
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
      </label>
      <button type="submit">Create Rule</button>
    </form>
  );
}

export default ModifyRuleForm;
