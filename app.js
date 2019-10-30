var helmet = require('helmet');
var i = require('duckduckgo-images-api');

var express = require('express');
var app = express();

app.use(helmet());

app.get('/', function (req, res) {
  console.log(req.query);
  i.image_search({ query: req.query, moderate: true })
                .then((results) => {
                  if(results!='No results'){
                    var filtered=results.filter(function(item){
                       return item.width<item.height;         
                    });
                    res.json(filtered);
                  }
                })
    .catch((err) => {
        res.status(500).send({ error: err});;
    });
})

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
