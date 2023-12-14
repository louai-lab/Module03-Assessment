import express from 'express'
import  {getAllArticles , createArticle , getOneArticle , updateArticle , deleteArticle}  from '../controllers/articleControllers.js'
import {upload} from '../middlewares/multer.js'

const articlesRouter = express.Router()

articlesRouter.get('/',getAllArticles)
articlesRouter.get('/:id',getOneArticle)
articlesRouter.patch('/:id',updateArticle)
articlesRouter.delete('/:id',deleteArticle)
articlesRouter.post('/create', upload.single("image"),createArticle)


export {articlesRouter}