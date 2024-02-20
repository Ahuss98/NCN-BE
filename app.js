const express = require("express");
const app = express();
const {getTopics,checkReq,getApi,getArticle} = require('./controllers/mainController')
const {handleCustomErrors,handlePsqlErrors} = require('./error.controller')
app.use(express.json());

app.get('/api',getApi)
app.get('/api/:dataSet',checkReq)
app.get('/api/topics',getTopics)
app.get('/api/articles/:articles_id',getArticle)


app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app

