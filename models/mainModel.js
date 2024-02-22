const db = require('../db/connection')
const format = require("pg-format");
const {convertToNestedArray} = require('../my-own-utils')

exports.readTopics = function(){
    return db.query(`SELECT * FROM topics`).then((data) => {
        return data.rows
    })
}

exports.readArticleId = function(id){
    return db.query(`SELECT * FROM articles WHERE articles.article_id = $1;`,[id]).then(({rows}) => {
        return rows[0]
    })
}

exports.readArticle = function(){
        return db.query(`SELECT articles.*, COUNT(comments.comment_id) AS       comment_count 
                        FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
                        GROUP BY articles.article_id
                        ORDER BY articles.created_at DESC;`).then(({rows}) => {
        return rows
    })
}

exports.readComments = function(id) {
    return db.query(`SELECT * FROM comments WHERE comments.article_id = $1
                    ORDER BY comments.created_at DESC;`, [id]).then(({rows}) => {
        return rows;
    });
};

exports.writeComment = function(comment){
    return db.query(`INSERT INTO comments
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,[comment.body,comment.author,comment.article_id]).then(({rows}) => {
        return rows[0]
                    })
                    .catch((err) => {
                        throw err
                    })
}

exports.updateArticle = function(inc_votes,id){
    const sqlString = `UPDATE articles
                        SET
                        votes = votes + $1
                        WHERE article_id = $2
                        RETURNING *;`
    return db.query(sqlString,[inc_votes,id]).then(({rows}) =>{
    return rows
}).catch((err) => {
    throw(err)
})
}

exports.removeComment = function(id){
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`,[id]).then((data) => {
        return data
    })
    .catch((err) => {
        throw(err)
    })
}

exports.readUsers = function(){
    return db.query(`SELECT * FROM users;`).then(({rows}) => {
        return rows
    })
}