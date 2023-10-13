const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const coinChange = require('./coinChange');  

app.use(express.json())
app.use(cors()); 

app.post('/coinchange', (req, res) => {
  const { coins, amount } = req.body;
  
  if (!coins || !amount) {
      return res.status(400).send({ error: 'Son necesarias tanto las monedas disponibles como el monto total' });
  }

  res.send(coinChange(coins, amount));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});