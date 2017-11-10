const express = require('express')
const app = express()
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '8889',
  user     : 'root',
  password : 'root',
  database : 'mysql'
});

connection.connect();

connection.query('DROP TABLE NOTES', function (error, results, fields) {
  if (error) throw error;
  connection.query('CREATE TABLE NOTES(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,title VARCHAR(100) NOT NULL,content VARCHAR(2000),date_end DATE)', function (error, results, fields) {
	  if (error) throw error;
	  console.log('Table NOTES created');
	});
});


app.get('/allnotes', function (req, res) {
  connection.query('SELECT * FROM NOTES', function (error, results, fields) {
	  if (error) throw error;
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(results, null, 2));
	});
})

app.get('/note/:id', function (req, res) {
  var q = 'SELECT * FROM NOTES WHERE id='+req.params.id
  connection.query(q, function (error, results, fields) {
	  if (error) throw error;
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(results, null, 2));
	});
})

app.post('/new', function (req, res) {
  var q = 'INSERT INTO NOTES(title, content, date_end) VALUES (\'Title\', \'Content test\', DATE( \'2017/01/20\'))'
  connection.query(q, function (error, results, fields) {
  	if (error) throw error;
  	res.send('This note has been successfully added');
  });
});

app.post('/delete/:id', function (req, res) {
  var q = 'DELETE FROM NOTES WHERE id='+req.params.id
  connection.query(q, function (error, results, fields) {
  	if (error) throw error;
  	res.send('This note has been successfully deleted')
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




