const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'approved',
    database: 'join_us'
})

const q = 'select count(*) AS count from users'

app.get('/', (req, res) => {
    connection.query(q, (error, results) => {
        if (error) throw error
        const count = results[0].count
        res.render('home.ejs', { count })
    })
})

app.post('/register', (req, res) => {
    const person = {
        email: req.body.email
    }
    connection.query('insert into users SET ?', person, (err, result) => {
        if (err) throw err
        res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log('Listenning to port 3000')
})