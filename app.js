const express = require("express");
const app = express();
const {getTopics,checkReq} = require('./controllers/mainController')



app.get('/api/:dataSet',checkReq)
app.get('/api/topics',getTopics)

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(404).send({msg: err.msg});
    }  else {
        next(err);
    }
})

module.exports = app