const express = require("express");
const app = express();
const {getTopics,checkReq,getApi,getArticleId,getArticles,getCommentsForArticleId,postCommentForArticleId,patchArticleById} = require('./controllers/mainController')
const {handleCustomErrors,handlePsqlErrors} = require('./error.controller')
app.use(express.json());

app.get('/api',getApi)
app.get('/api/:dataSet',checkReq)
app.get('/api/topics',getTopics)
app.get('/api/articles/:articles_id',getArticleId)
app.get('/api/articles',getArticles)
app.get('/api/articles/:article_id/comments',getCommentsForArticleId)
app.post('/api/articles/:article_id/comments',postCommentForArticleId)
app.patch('/api/articles/:article_id',patchArticleById)


app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app

