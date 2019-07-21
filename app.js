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
const leadsSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    preferredContactMethod: String,
    city: String,
    state: String,
    zip: String,
});


//note: iterate before sending to database;

let Leads = mongoose.model('Leads', leadsSchema,);

// routes 

app.post('/leadsuccess', (req, res) => {
  let values = Object.values(req.body);
  let lowerName = values[0].toLowerCase();
  let leadScore = 0;
  console.log(values);
  console.log(typeof(values));
  
  for(let i = 0; i < 1; i++) {
    if(lowerName.includes('j')) {
      leadScore += 3;
    };
    if(values[3] === 'carrier pigeon') {
      leadScore -= 10;
    } else if(values[3] === 'phone') {
      leadScore += 7;
    } else {
      leadScore;
    };
    if((values[5] === 'ak') || (values[5] === 'hi')) {
      leadScore -= 100;
    };
    if(values[6].startsWith('7')) {
      leadScore += 7;
    };
  };
 
  Leads.update( { '$addToSet': { 'leadscore': leadScore } })

  console.log(values);
  console.log('blank');
  console.log(req.body);
  console.log(typeof(leadScore));

  let data = new Leads(res.body, leadScore);
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
