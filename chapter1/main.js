const plays = require("./__mocks__/plays.json");
const invoices = require("./__mocks__/invoices.json");
const { statement } = require("./statement");

console.log(statement(invoices[0], plays));
