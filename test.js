var INTERVAL = 1000;
var  pairs = { 
  'USD/CAD': 1.02029989,
  'EUR/JPY': 97.7538829,
  'EUR/USD': 1.2273,
  'EUR/CHF': 1.20091588,
  'USD/CHF': 0.978502304,
  'EUR/GBP': 0.793085622,
  'GBP/USD': 1.5475,
  'AUD/CAD': 1.03939,
  'NZD/USD': 0.7962,
  'GBP/CHF': 1.51423232,
  'AUD/USD': 1.01900,
  'GBP/JPY': 123.257666,
  'USD/JPY': 79.649542,
  'CHF/JPY': 81.3994425,
  'EUR/CAD': 1.25221405,
  'AUD/JPY': 81.1628833,
  'EUR/AUD': 1.20441609,
  'AUD/NZD': 1.27982919
};
var pair_keys = Object.keys(pairs);

function tick() {
  var ts = new Date().getTime();
  var key = pair_keys[Math.floor(Math.random()*pair_keys.length)];
  var value = pairs[key];

  var diff = Math.random()*value*0.005;
  if (Math.random() < 0.5) 
    diff *= -1;
  pairs[key] += diff;

  console.log(ts + ': ' + key + ' ' + (value + diff).toFixed(4));

  setTimeout(function() {
      tick();
    }, parseInt(Math.random()*100));
}

process.on('SIGINT', function() {
  console.log('feed stopped');
  process.exit();
});

setInterval(tick, INTERVAL);
