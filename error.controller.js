exports.handlePsqlErrors = (err, req, res, next) => {
    if(err.code === "22P02" || err.code === "23502"){
        console.log('psql error')
        res.status(400).send({msg:'bad request'})
    } else {
        next(err)
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg){
        res.status(400).send(err);
    }  else {
        next(err);
    }
};