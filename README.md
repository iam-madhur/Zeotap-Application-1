Rule Engine Application

Features
-Create rules through a user-friendly form.
-Display a list of all created rules.
-Evaluate rules against user-defined data inputs.
-Combine multiple rules into a single abstract syntax tree (AST) for complex evaluations.

Installation Instructions--
To set up the application locally, please follow the steps below:


#Backend Setup:

Navigate to the backend directory:
cd backend

Install the required dependencies:
npm install

Start the backend server:
node index.js


#Frontend Setup:

Navigate to the frontend directory:
cd frontend

Install the required dependencies:
npm install

Start the frontend application:
npm run dev


API Endpoints--
Backend API Endpoints:
POST /rules/create_rule: Creates a new rule.
GET /rules: Retrieves all existing rules.
POST /rules/evaluate_rule: Evaluates a rule based on provided data.
POST /rules/combine_rules: Combines multiple rules into a single AST.


File Structure--
Backend:
database.js: Configuration for the SQLite database.
index.js: Main entry point for the backend server, configuring Express and middleware.
routes/rules.js: Defines the API endpoints for rule operations.
schema.js: Sets up the necessary database schema for rules.
ast.js: Implements the Node class for constructing the AST.

Frontend:
src/App.jsx: Main application component, handling routing and navigation.
src/components/CombineRulesForm.jsx: Form for selecting and combining rules.
src/components/EvaluateForm.jsx: Form for evaluating a specific rule.
src/components/ModifyRuleForm.jsx: Form for creating a new rule.
src/components/RulesList.jsx: Displays the list of existing rules.
src/index.css: Basic styling for the application.
src/main.jsx: Entry point for the React application.