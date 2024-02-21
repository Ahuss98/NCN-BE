const {readTopics,readArticleId,readArticle,readComments,writeComment} = require('../models/mainModel')


exports.checkReq = function(req,res,next) {
    const dataSet = req.params.dataSet 
    const availbleData = ['topics','articles','comments','users']
    if (!availbleData.includes(dataSet)){
        return res.status(404).send({msg:'route does not exist'})
    }
    next()
}

exports.getTopics = function(req,res,next){
    readTopics().then((body) => {
        res.status(200).send(body)
    })
    .catch(next)
}

exports.getApi = function(req,res,next){
    const endpoints = require('../endpoints.json')
    res.status(200).send(endpoints)
}

exports.getArticleId = function(req,res,next){
    const id = req.params.articles_id
    readArticleId(id).then((body) => {
        if(!body){
            res.status(404).send({msg:'not found'})
        }
        res.status(200).send(body)
    })
    .catch((err) => {
        next(err)

    })
}

exports.getArticles = function(req,res,next){
    readArticle().then((body) => {
        res.status(200).send({articles: body})
    })
}
exports.getCommentsForArticleId = function(req,res,next){
    const id = req.params.article_id
    readComments(id).then((body) => {
        if(body.length === 0){
            res.status(404).send({msg:'not found'})
        }
        res.status(200).send(body)
    })
    .catch((err) => {
        next(err)

    })
}

exports.postCommentForArticleId = function (req,res,next){
    const id = req.params.article_id
    const { username, body } = req.body
    if (!username || !body) {
        return res.status(400).send({ msg: "bad request" });
    }
    if (isNaN(id)) {
        return res.status(400).send({ msg: "not found" });
    }
    const comment = {
        body,
        author: username,
        article_id: id,
    };
    readComments(id).then((body) => {
        if(body.length === 0){
            res.status(404).send({msg:'not found'})
        }
        return writeComment(comment)
    })
    .then((result) => {
            res.status(201).send(result)
        })
    .catch((err) => {
        next(err)
    })
}
