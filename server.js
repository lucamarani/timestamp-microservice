var express = require('express');

var path = process.cwd();
var app = express();

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/').get(function (req, res) {
    res.sendFile(path + '/public/index.html');
    
});

function responseObj (date, querytype, dateString) {
    return {
        unix: date.getTime()/1000,
        natural: monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
        dateString: dateString
    }
}

app.route('/[0-9]+$').get(function (req, res) {
    var dateString = req.url.split('/')[1]
    var date = new Date(parseInt(dateString)*1000)
    res.json(responseObj(date, 'unix'));
})

app.route('/*').get(function (req, res) {
    var dateString = unescape(req.url.split('/')[1])
    var date = new Date(dateString)
    res.json(responseObj(date, 'natural'));
})

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
