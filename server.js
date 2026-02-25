const express = require('express');
const { add, subtract, multiply, divide } = require('./src/index');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Math Operations</title>
      <style>
        body { font-family: Arial; margin: 40px; }
        input, select, button { margin: 5px; padding: 8px; }
        .result { margin-top: 20px; font-size: 20px; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Math Operations Calculator</h1>
      <form id="calcForm">
        <input type="number" id="a" placeholder="Enter first number" step="any" required>
        <select id="operation">
          <option value="add">+ Add</option>
          <option value="subtract">- Subtract</option>
          <option value="multiply">× Multiply</option>
          <option value="divide">÷ Divide</option>
        </select>
        <input type="number" id="b" placeholder="Enter second number" step="any" required>
        <button type="submit">Calculate</button>
      </form>
      <div class="result" id="result"></div>

      <script>
        document.getElementById('calcForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const a = document.getElementById('a').value;
          const b = document.getElementById('b').value;
          const op = document.getElementById('operation').value;
          
          const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b), operation: op })
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = data.error || 'Result: ' + data.result;
        });
      </script>
    </body>
    </html>
  `);
});

// API endpoint for calculations
app.post('/calculate', (req, res) => {
  try {
    const { a, b, operation } = req.body;
    let result;
    
    switch(operation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }
    
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});