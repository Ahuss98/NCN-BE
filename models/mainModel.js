const db = require('../db/connection')

exports.readTopics = function(){
    return db.query(`SELECT * FROM topics`).then((data) => {
        return data.rows
    })
}

exports.readArticle = function(id){
    return db.query(`SELECT * FROM articles WHERE articles.article_id = $1;`,[id]).then(({rows}) => {
        console.log(rows[0])
        return rows[0]
    })
}