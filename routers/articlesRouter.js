const express = require('express')
const articlesRouter = express.Router()
const {getArticleId,getArticles,patchArticleById,getCommentsForArticleId,postCommentForArticleId} = require('../controllers/mainController')

articlesRouter.get('/',getArticles)
articlesRouter.get('/:articles_id',getArticleId)
articlesRouter.patch('/:article_id',patchArticleById)

//comment actions from article route
articlesRouter.get('/:article_id/comments',getCommentsForArticleId)
articlesRouter.post('/:article_id/comments',postCommentForArticleId)

module.exports = articlesRouter