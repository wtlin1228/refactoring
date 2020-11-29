const plays = require("../__mocks__/plays.json");
const invoices = require("../__mocks__/invoices.json");

const { statement, htmlStatement } = require("../statement");
const { expect } = require("@jest/globals");

test("statement should render correct string", () => {
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

test("htmlStatement should render correct html", () => {
  // Arrange

  // Act
  const result = htmlStatement(invoices[0], plays);

  // Assert
  expect(result).toContain("<h1>Statement for BigCo</h1>");
  expect(result).toContain("<table>");
  expect(result).toContain(
    "<tr><th>play</th><th>seat</th><th>cost</th></tr><tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>"
  );
  expect(result).toContain(
    "<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>"
  );
  expect(result).toContain(
    "<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>"
  );
  expect(result).toContain("</table>");
  expect(result).toContain("<p>Amount owed is <em>$1,730.00</em></p>");
  expect(result).toContain("<p>You earned <em>47</em> credits<p>");
});
