const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql')
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_node_react',

});

app.use(cors());
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {

    const sqlSelect = "SELECT * FROM crud_node_react.movies_review";

    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const description = req.body.description;

    const sqlInsert = "INSERT INTO crud_node_react.movies_review (movieName, description) VALUES (?,?)";

    db.query(sqlInsert, [movieName, description], (err, result) => {
        res.send(result)
    })
});

app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movies_review WHERE movieName = ?"

    db.query(sqlDelete, name, (err, result) => {
        if(err) console.log(err)
    })
})

app.put("/api/update/", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.description;
    const sqlUpdate = "UPDATE movies_review SET description = ? WHERE movieName = ?"

    db.query(sqlUpdate, [review, name], (err, result) => {
        if(err) console.log(err)
    })
})


app.listen(3001, () => {
    console.log("running on port 3001")
});