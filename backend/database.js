const Database = require("better-sqlite3");

const db = new Database("database/rule-engine.db", { verbose: console.log });

module.exports = db;
