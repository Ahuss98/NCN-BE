const db = require('../db/connection')

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