const plays = require("../__mocks__/plays.json");
const invoices = require("../__mocks__/invoices.json");

const { statement } = require("../statement");
const { expect } = require("@jest/globals");

test("should render correct html", () => {
  // Arrange

  // Act
  const result = statement(invoices[0], plays);

  // Assert
  expect(result).toContain("Statement for BigCo");
  expect(result).toContain("Hamlet: $650.00 (55) seats");
  expect(result).toContain("As You Like It: $580.00 (35) seats");
  expect(result).toContain("Othello: $500.00 (40) seats");
  expect(result).toContain("Amount owed is $1,730.00");
  expect(result).toContain("You earned 47 credits");
});
