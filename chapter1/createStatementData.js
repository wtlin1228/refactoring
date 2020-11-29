const { PerformanceCalculator } = require("./performanceCalculator");

function createStatementData(invoice, plays) {
  const result = {};

  result.customer = invoice.customer;
  result.performances = invoice.performances.map((aPerformance) =>
    enrichPerformance(aPerformance, plays)
  );
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;
}

function totalAmount(data) {
  return data.performances.reduce((acc, curr) => acc + curr.amount, 0);
}

function totalVolumeCredits(data) {
  return data.performances.reduce((acc, curr) => acc + curr.volumeCredits, 0);
}

function enrichPerformance(aPerformance, plays) {
  const calculator = new PerformanceCalculator(
    aPerformance,
    playFor(aPerformance, plays)
  );

  const result = Object.assign({}, aPerformance);

  result.play = playFor(result, plays);
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;

  return result;
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}

module.exports = { createStatementData };
