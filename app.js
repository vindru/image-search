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

app.listen(process.env.PORT||3000);
