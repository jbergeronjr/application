const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://default:defaultpass1@leaddb-1p6na.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

//create schema
const Schema = mongoose.Schema;
const leadsSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    preferredContactMethod: String,
    city: String,
    state: String,
    zip: String,
    score: Number
});

//note: iterate before sending to database;

let Leads = mongoose.model('Leads', leadsSchema);

// routes 

app.post('/leadsuccess', (req, res) => {
  let lowerName = req.body.name.toLowerCase();
  let leadScore = 0;
  
  for(let i = 0; i < 1; i++) {
    if(lowerName.includes('z')) {
      leadScore += 5;
    };
    // This next conditional is directly related to the total number of sales made. If carrier pigeon sales is 1/10, lead score 
    //shouldn't be affected much. If it's 1/1MM, it should be affected greatly.   
    if(req.body.preferredContactMethod === 'carrier pigeon') {
      leadScore -= 15;
    } else if(req.body.preferredContactMethod === 'phone') {
      leadScore += 3;
    } else {
      leadScore;
    };
    if((req.body.state === 'AK') || (values[5] === 'HI')) {
      leadScore -= 50;
    };
    if(req.body.state === 'OH'){
      leadScore += 30;
    };
    if(req.body.zip.startsWith('7')) {
      leadScore += 5;
    };
  };

  let data = new Leads(req.body); 
  Object.assign(data, {'score': leadScore});
  data.save().then(data => {
    res.render('leadsuccess.ejs');
  })
  .catch(err => {
    res.status(400).send('Unable to save to DB');
  });

  // let data = new Leads(req.body); 
  // Object.assign(data, {'score': leadScore});
  // data.save((err)=> {
  //   if (err) throw err;
  // })
  // res.render('leadsuccess.ejs');
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/index', (req, res) => {
  res.render('index.ejs');
});

// app.delete('/delete/:id', (req, res) => {
//   Leads.findByIdAndRemove({_id: req.params.id});
// });

app.get('/leads', (req, res) => {
  res.render('viewleads.ejs');
});

app.get('/viewleads', (req, res) => {
 Leads.find({}, (err, data) => {
  if(err) throw err;
  res.send(data);
  });
});

//function for creating a table

app.use(express.static(__dirname + '/public'));

app.listen('5000', () => {
  console.log('Server started on port 5000');
});
