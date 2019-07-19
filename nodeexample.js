const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'lead_db'
});

// Connect
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });

const app = express();

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE lead_db';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('database created...');
  });
})

//create table
app.get('/createposttable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...')
  });
});

//insert post 1
app.get('/addpost1', (req, res) => {
  let post = { title: 'post 1', body: 'This is post number 1'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts 1 added...')
  });
});

app.get('/addpost2', (req, res) => {
  let post = { title: 'post 2', body: 'This is post number 2'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts 2 added...')
  });
});

// select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Posts fetched..')
  });
});

//select single posts
app.get('/getposts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post fetched..')
  });
});

app.get('/getposts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post fetched..')
  });
});

app.listen('8080', () => {
  console.log('Server started on port 8080');
});
