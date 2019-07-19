module.exports = function(app) {

app.post('/addlead', (req, res) => {
  console.log(req.body);
  res.send('You sent the name "' + req.body.name + '".');
});

app.get('/', (req, res) => {
  res.send(__dirname + './' + '/public/index.html');
});

app.get('/', (req, res) => {

});

};