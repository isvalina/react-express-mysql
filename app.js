const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//select all
app.get('/', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'react_db'
    })
    
    connection.connect()
    
    connection.query('SELECT * from unos', function (err, rows, fields) {
      if (err) throw err
    
            console.log(res);

      return res.send(rows);
    })
    
    connection.end()
})

//insert
app.post('/insert', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'react_db'
    })

    connection.connect()
    
    connection.query("INSERT INTO unos (text) VALUES ('" + req.body.text + "')", function (err, rows, fields) {
      if (err) throw err
      return res.send('OK')
    })
    
    connection.end()
})

//delete
app.get('/delete/:id', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'react_db'
    })
    
    connection.connect()
    
    connection.query('DELETE FROM unos where sifra=' + req.param('id'), function (err, rows, fields) {
      if (err) throw err
    })
    
    connection.end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})