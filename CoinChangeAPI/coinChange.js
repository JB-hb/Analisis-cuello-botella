function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  const choice = Array(amount + 1).fill(-1);
  dp[0] = 0;

  for (let coin of coins) {
      for (let j = coin; j <= amount; j++) {
          if (dp[j] > dp[j - coin] + 1) {
              dp[j] = dp[j - coin] + 1;
              choice[j] = coin;
          }
      }
  }

  if (dp[amount] === Infinity) return { result: -1, coinsUsed: {} };

  // Retroceso para encontrar las monedas utilizadas
  const coinsUsed = {};
  for (let remaining = amount; remaining > 0; remaining -= choice[remaining]) {
      const coin = choice[remaining];
      coinsUsed[coin] = (coinsUsed[coin] || 0) + 1;
  }

  return { result: dp[amount], coinsUsed };
}

module.exports = coinChange;
