const express = require("express");
const app = express();
const {getTopics,checkReq,getApi} = require('./controllers/mainController')
app.use(express.json());

app.get('/api',getApi)
app.get('/api/:dataSet',checkReq)
app.get('/api/topics',getTopics)

app.use ('*',(err, req, res, next) => {
    if(err.status && err.msg){
        res.status(404).send({msg: err.msg});
    }  else {
        next(err);
    }
})

module.exports = app

