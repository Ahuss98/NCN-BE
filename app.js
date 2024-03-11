const express = require("express");
const app = express();
const cors = require('cors')

const topicsRouter = require('./routers/topicsRouter')
const articlesRouter = require('./routers/articlesRouter')
const commentsRouter = require("./routers/commentsRouter");
const usersRouter = require("./routers/usersRouter");

const {checkReq,getApi} = require('./controllers/mainController')
const {handleCustomErrors,handlePsqlErrors} = require('./error.controller');
app.use(cors());
app.use(express.json());

app.get('/api',getApi)
app.get('/api/:dataSet',checkReq)

app.use('/api/topics', topicsRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/comments',commentsRouter)
app.use('/api/users',usersRouter)



app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app

