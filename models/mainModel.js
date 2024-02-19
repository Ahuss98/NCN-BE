const db = require('../db/connection')

exports.readTopics = function(){
    return db.query(`SELECT * FROM topics`).then((data) => {
        return data.rows
    })

}