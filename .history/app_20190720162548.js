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
    leadscore: Number
});

//note: iterate before sending to database;

let Leads = mongoose.model('Leads', leadsSchema);

// routes 

app.post('/leadsuccess', (req, res) => {
  let data = new Leads(req.body);
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
  // let leadScore = 0;
  // for(let i = 0; i < data.length; i++){
  //   if(name.contains('z')) {
  //     leadScore += 5;
  //   } 
  //   if(zip.startsWith('7')) {
  //     leadScore += 5;
  //   } 
  //   if(preferredContactMethod === 'Phone') {
  //     leadScore += 3;
  //   }
  //   if(preferredContactMethod === 'Carrier Pigeon') {
  //     leadScore += 1;
  //   }
  //   if((state === 'HI') || (state === 'AK')) {
  //     leadScore -= 100;
  //   };
  // }
  console.log(data);
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
