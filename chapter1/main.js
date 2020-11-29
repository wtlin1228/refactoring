const plays = require("./__mocks__/plays.json");
const invoices = require("./__mocks__/invoices.json");
const { statement, htmlStatement } = require("./statement");

console.log(statement(invoices[0], plays));
console.log(htmlStatement(invoices[0], plays));
