const express = require('express')
const app = express()
const Mongo = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
var db

Mongo.connect(dbUrl, (err, database) => {
    db = database.db('srin')
    console.log("Connection to DB Success")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})

function getAllStudents() {
    return new Promise((resolve, reject) => {
        db.collection("student").find().toArray((err,data) =>{
            err?reject(err):resolve(data)
        })
    })
}

app.get("/", async (req,res) => {
    let result = []
    await getAllStudents()
        .then((res) => {
            res.forEach((student) => {
                result.push(student)
            })
        })
        .catch((err) => console.log(err))
        .finally(() => res.send(result))
    
})
