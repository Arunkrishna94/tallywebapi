var express = require('express');
var router = express.Router();
var xml = require('xml');
var async = require('async');
var request = require('request');

/* GET home page. */
var xmlstring = `<ENVELOPE>
<HEADER>
<TALLYREQUEST>Export DATA</TALLYREQUEST>
</HEADER>
<BODY>
<EXPORTDATA>
<REQUESTDESC>
<REPORTNAME>LIST of Companies</REPORTNAME>
<STATICVARIABLES>
<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
</STATICVARIABLES>
</REQUESTDESC>
</EXPORTDATA> </BODY>
</ENVELOPE>`;

router.get('/', function(req, res, next) {
   var options = {
uri: 'http://localhost:9000',

method: 'POST',

headers: { 'Content-Type': 'text/xml;charset:UTF-8',
'Content-Length': Buffer.byteLength(xmlstring)},
body: req.body.xmlstr
};
var result="";

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response) // Show the HTML for the Google homepage. 
res.send("result--->"+body);
  
    // result = body
   }
});
// async.parallel([
// function(callback) {
// /* tally data fetch from local tally server*/
// var url = "http://localhost:9000";
// request(options, function(err, response, body) {
// // JSON body
// if(err) { console.log(err);
// callback(true);
// return;
// }

// result = body;
// callback(false, body);
// });

// }],function(err, results) {
// if(err) { console.log(err);
// res.send(500,"Server Error");
// return;
// }

})

router.get('/creategroup',(req, res)=>{
    var options = { method: 'POST',
    url: 'http://localhost:9000',
    headers:
    {
    'cache-control': 'no-cache',
    'Content-Type': 'text/xml' },
    body: '<!--XML tags to creates a group named Group from NodeJS XML under Sundry Debtors-->'+
    '<ENVELOPE>'+
    ' <HEADER>'+
    ' <TALLYREQUEST>Import Data</TALLYREQUEST>'+
    ' </HEADER>'+
    ' <BODY>'+
    ' <IMPORTDATA>'+
    ' <REQUESTDESC>'+
    ' <REPORTNAME>All Masters</REPORTNAME>'+
    ' </REQUESTDESC>'+
    ' <REQUESTDATA>'+
    ' <TALLYMESSAGE xmlns:UDF="TallyUDF">'+
    ' <GROUP NAME=" Group from Kryptos" ACTION="Create">'+
    ' <NAME.LIST>'+ 
    ' <NAME> Group from Arunkrishna XML </NAME>'+
    ' </NAME.LIST>'+
    ' <PARENT>Sundry Debtors</PARENT>'+
    ' <ISSUBLEDGER>No</ISSUBLEDGER>'+
    ' <ISBILLWISEON>No</ISBILLWISEON>'+
    ' <ISCOSTCENTRESON>No</ISCOSTCENTRESON>'+
    ' </GROUP>'+
    ' </TALLYMESSAGE>'+
    ' </REQUESTDATA>'+
    ' </IMPORTDATA>'+
    ' </BODY>'+
    '</ENVELOPE>'
    };
   request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log(response) // Show the HTML for the Google homepage. 
     res.send("result--->"+body);
           }
                 });
})

module.exports = router;
