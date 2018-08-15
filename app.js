const path = require('path');
const express = require('express');
const { createCanvas } = require('canvas');
const app = express();

app.get('/:width/:height?', main);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function main(req, res) {
  const width = req.params.width ? parseInt(req.params.width) : 200;
  const height = req.params.height ? parseInt(req.params.height) : width;
  const bg = req.query.bg || 'cccccc';
  const color = req.query.color || '909090';
  const text = req.query.text || `${width}x${height}`;
  const fontSize = req.query.size || 30;

  const canvas = createCanvas(width, height, 'svg');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `#${bg}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Helvetica`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `#${color}`;

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const buf = canvas.toBuffer();

  res.set({
    'Content-Type': 'image/svg+xml',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.send(buf);
}

app.listen(8000, function () {
  console.log('App is listening on port 8000!');
});