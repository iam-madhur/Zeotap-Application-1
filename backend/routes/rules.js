const express = require("express");
const router = express.Router();
const db = require("../database");
const Node = require("../ast");

// Endpoint to create a new rule
router.post("/create_rule", (req, res) => {
  const { rule_string } = req.body;

  // Validate input
  if (!rule_string) {
    return res.status(400).json({ error: "Rule string is required." });
  }

  try {
    const stmt = db.prepare("INSERT INTO rules (rule_string) VALUES (?)");
    const info = stmt.run(rule_string);
    res.json({ id: info.lastInsertRowid, rule_string });
  } catch (error) {
    console.error(`Error creating rule: ${error.message}`);
    res.status(500).json({ error: "Error creating rule." });
  }
});

// Endpoint to get all rules
router.get("/", (req, res) => {
  try {
    const rules = db.prepare("SELECT * FROM rules").all();
    res.json(rules);
  } catch (error) {
    console.error(`Error fetching rules: ${error.message}`);
    res.status(500).json({ error: "Error fetching rules." });
  }
});

// Function to create a rule and generate the AST
function create_rule(rule_string) {
  console.log(`Creating rule from: ${rule_string}`);

  // Simple parsing logic
  const tokens = rule_string.split(" ");
  const ast = buildAst(tokens);
  return ast;
}

// Helper function to build the AST from tokens
function buildAst(tokens) {
  if (tokens.length === 0) return null;

  let current = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (isOperator(token)) {
      const leftNode = current;
      const rightNode = new Node("operand", null, null, tokens[++i]);
      current = new Node("operator", leftNode, rightNode, token);
    } else if (current === null) {
      current = new Node("operand", null, null, token);
    }
  }

  return current;
}

// Check if a token is an operator
function isOperator(token) {
  return token === "AND" || token === "OR";
}

// Function to combine multiple rules into a single AST
function combine_rules(rules) {
  console.log(`Combining rules: ${rules}`);

  if (rules.length === 0) return null;

  let combinedAst = rules[0];

  for (let i = 1; i < rules.length; i++) {
    combinedAst = new Node("operator", combinedAst, rules[i], "AND");
  }

  return combinedAst;
}

// Placeholder for combining rules logic
router.post("/combine_rules", (req, res) => {
  const { rules } = req.body;

  // Validate input
  if (!Array.isArray(rules) || rules.length === 0) {
    return res.status(400).json({ error: "Valid rules array is required." });
  }

  try {
    // Assuming rules are sent as arrays of AST nodes
    const combinedAst = combine_rules(rules);
    res.json({ combinedAst }); // Respond with the combined AST
  } catch (error) {
    console.error(`Error combining rules: ${error.message}`);
    res.status(500).json({ error: "Error combining rules." });
  }
});

function evaluate_rule(ast, data) {
  if (!ast) {
    throw new Error("AST is undefined");
  }
  if (ast.type === "operand") {
    return evaluate_operand(ast, data);
  } else if (ast.type === "operator") {
    return evaluate_operator(ast, data);
  }
}

function evaluate_operand(node, data) {
  const { value } = node;
  const [key, operator, operandValue] = value.split(" ");

  switch (operator) {
    case ">":
      return data[key] > Number(operandValue);
    case "<":
      return data[key] < Number(operandValue);
    case "=":
      return data[key] === operandValue.replace(/'/g, "");
    default:
      return false;
  }
}

function evaluate_operator(node, data) {
  const leftResult = evaluate_rule(node.left, data);
  const rightResult = evaluate_rule(node.right, data);

  switch (node.value) {
    case "AND":
      return leftResult && rightResult;
    case "OR":
      return leftResult || rightResult;
    default:
      return false;
  }
}

// Update evaluate_rule endpoint to receive rule_string
router.post("/evaluate_rule", (req, res) => {
  const { rule_string, data } = req.body;

  // Log incoming request for debugging
  console.log("Request body:", req.body);

  if (!rule_string) {
    return res.status(400).json({ error: "Rule string is required." });
  }

  try {
    const ast = create_rule(rule_string);
    const result = evaluate_rule(ast, data);
    res.json({ result });
  } catch (error) {
    console.error(`Error evaluating rule: ${error.message}`);
    res.status(500).json({ error: "Error evaluating rule." });
  }
});

module.exports = router;
