import Article from "../models/article.js";
import fs from 'fs'


// get all articles

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(201).json(articles);
    console.log(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get one article

const getOneArticle = async ( req,res)=>{
    const articleId = req.params.id;

    try{
        const article = await Article.findOne({where:{id:articleId}})

        if (article) {
            res.status(200).json(article);
          } else {
            res.status(404).json({ error: "Article not found" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
    }

}




// create an article

const createArticle = async (req, res) => {
  const { title, category, body, author } = req.body;

  if (!req.file) {
    res.status(400).json({ error: "upload an image" });
  }

  const image = req.file.filename;

  try {
    const newArticle = await Article.create({
      title,
      category,
      body,
      author,
      image,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
    console.log(newArticle);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path);
  }
};


// update an article

const updateArticle = async ( req,res) =>{
    const articleId = req.params.id;

    const oldArticle = await Article.findOne({where:{id:articleId}})

    try{
        const updatedArticle = req.body ;

        const oldImagePath = `public/images/${oldArticle.image}`;

        if(req.file){
            updatedArticle.image = req.file.filename;

            fs.unlinkSync(oldImagePath,(err)=>{
                if(err){
                    return res.status(500).json({error:`error deleting the old image`})
                }
            })
        }

        await oldArticle.update(updatedArticle)
        res.status(200).json({ message: "Article updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error , ${error.message}` });
      }
}


// delete an article

const deleteArticle = async (req,res)=>{
    const articleId = req.params.id;

    try{
        const articleToDelete = await Article.findOne({
            where:{id:articleId}
        })

        if(!articleToDelete){
            return res.status(404).json({ error: "article not found" });
        }

        await articleToDelete.destroy();

        const oldImagePath = `public/images/${articleToDelete.image}`;

        fs.unlink(oldImagePath, (err) => {
            if (err) {
              return res.status(500).json({ error: `error deleting the old image` });
            }
          });
      
          res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}



export { getAllArticles, createArticle , getOneArticle , updateArticle , deleteArticle};
