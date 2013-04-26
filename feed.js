var host = 'sb66', port = '27017';
var Db = require('mongodb').Db;
var format = require('util').format;

var INTERVAL = 1;
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
var ticks;

function tick() {
  var ts = new Date().getTime();
  var key = pair_keys[Math.floor(Math.random()*pair_keys.length)];
  var value = pairs[key];

  var diff = Math.random()*value*0.005;
  if (Math.random() < 0.5) 
    diff *= -1;
  pairs[key] += diff;

  var p = (value + diff).toFixed(4);
  //console.log(ts + ': ' + key + ' ' + p);
  if (ticks)
    ticks.insert({'ts':ts, 's':key, 'p':p}, function(err, result) {
      if (err)
        console.log(err);
    });

  setTimeout(function() {
      tick();
    }, parseInt(Math.random()*10));
}

process.on('SIGINT', function() {
  console.log('feed stopped');
  process.exit();
});

console.log("Connecting to " + host + ":" + port + "...");
Db.connect(format("mongodb://%s:%s/test?w=1", host, port), function(err, db) {
  if (err)
    console.log(err);

  console.log("Dropping collection ticks...");
  db.dropCollection('ticks', function(err, result) {
    if (err)
      console.log(err);

    console.log("ticks collection dropped");
  });

  console.log("Creating collection ticks...");
  ticks = db.collection('ticks');
  console.log("ticks collection created");
  
  ticks.createIndex([['all'], ['_id', 1], ['ts', 1], ['s', 1], ['p', 1]], function(err, indexName) {
    if (err)
      console.log(err);

    console.log("created index: " + indexName);

    ticks.indexInformation(function(err, doc) {
      if (err)
        console.log(err);
  
      console.log("Generating ticks...");

      setInterval(tick, INTERVAL);
    });

  });
});



