const {readTopics} = require('../models/mainModel')
const endpoints = require('../endpoints.json')


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
    res.status(200).send(endpoints)
}