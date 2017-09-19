/* global chance */
const DataGenerator = {};

DataGenerator.generateHistoryItem = () => {
  var isPayload = chance.bool();
  var payloadMethods = ['POST', 'PUT', 'DELETE', 'OPTIONS'];
  var otherMethods = ['GET', 'HEAD'];
  var headersSize = chance.integer({
    min: 0,
    max: 10
  });
  var headers = '';
  for (var i = 0; i < headersSize; i++) {
    headers += 'X-' + chance.word() + ': ' + chance.word() + '\n';
  }
  if (isPayload) {
    headers += 'content-type: application/x-www-form-urlencoded';
  }
  var payload = isPayload ? chance.paragraph() : '';
  var d = new Date();
  var randomDay = chance.date({year: d.getFullYear(), 'month': d.getMonth()});
  var t = randomDay.getTime();
  var today = DataGenerator.getDayToday(t);
  var item = {
    'url': chance.url(),
    'method': chance.pick(isPayload ? payloadMethods : otherMethods),
    'headers': headers,
    'payload': payload,
    'created': t,
    'updated': t
  };
  item._id = today + '/' + encodeURIComponent(item.url) + '/' + item.method;
  return item;
};

DataGenerator.getDayToday = function(timestamp) {
  var d = new Date(timestamp);
  var tCheck = d.getTime();
  if (tCheck !== tCheck) {
    throw new Error('Invalid timestamp: ' + timestamp);
  }
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  return d.getTime();
};

DataGenerator.processResults = function(res) {
  // sort by updated
  res.sort((a, b) => {
    if (a.updated < b.updated) {
      return 1;
    }
    if (a.updated > b.updated) {
      return -1;
    }
    return 0;
  });
  var days = [];
  res = res.map((item) => {
    let d = DataGenerator.computeHistoryTime(item._id.split('/')[0]);
    if (days.indexOf(d) === -1) {
      days[days.length] = d;
      item.hasHeader = true;
      item.header = d;
    }
    return item;
  });
  return res;
};

DataGenerator.computeHistoryTime = function(date) {
  var d = new Date(Number(date));
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat(undefined, options).format(d);
};

DataGenerator.generateRequests = function(size) {
  var list = [];
  for (var i = 0; i < size; i++) {
    list.push(DataGenerator.generateHistoryItem());
  }
  return list;
};
