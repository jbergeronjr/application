const express = require('express');
const mysql = require('mysql');
const uuid = require('uuid');
const path = require('path');
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
  let values = Object.values(req.body);
  let lowerName = values[0].toLowerCase();
  let leadScore = 0;
  
  for(let i = 0; i < 1; i++) {
    if(lowerName.includes('z')) {
      leadScore += 3;
    };
    // This next conditional is directly related to the total number of sales made. If carrier pigeon sales is 1/10, lead score 
    //shouldn't be affected much. If it's 1/1MM, it should be affected greatly.   
    if(values[3] === 'carrier pigeon') {
      leadScore -= 10;
    } else if(values[3] === 'phone') {
      leadScore += 7;
    } else {
      leadScore;
    };
    if((values[5] === 'AK') || (values[5] === 'HI')) {
      leadScore -= 100;
    };
    if(values[6].startsWith('7')) {
      leadScore += 7;
    };
  };
  
// const leadScoreSchema = new Schema();
// leadScoreSchema.add(leadsSchema).add({ score: Number });

  let data = new Leads(req.body); 
  Object.assign(data, {'score': leadScore});
  console.log(leadScore);
  console.log(data);
  data.save().then(item => {
    res.send('Lead saved to database');
  })
  .catch(err => {
    res.status(400).send('unable to save to database');
  });
  res.render('leadsuccess.ejs');
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/index', (req, res) => {
  res.render('index.ejs');
});

app.get('/leads', (req, res) => {
  res.render('viewleads.ejs');
});


app.get('/viewleads', (req, res) => {
 Leads.find({}, (err, data) => {
  if(err) throw err;
  res.send(data);
  });
});

// app.get('/viewleads', (req, res) => {
//   Leads.find({}, (err, data) => {
//     if(err) throw err;
//     res.send(data);
//   });
// });

//function for creating a table

app.use(express.static(__dirname + '/public'));

// const addLead = document.getElementById('submitLead');

app.listen('5000', () => {
  console.log('Server started on port 5000');
});
