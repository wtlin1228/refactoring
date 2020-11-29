const {
  TragedyCalculator,
  ComedyCalculator,
} = require("./performanceCalculator");

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
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance, plays)
  );

  const result = Object.assign({}, aPerformance);

  result.play = playFor(result, plays);
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;

  return result;
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}

module.exports = { createStatementData };
