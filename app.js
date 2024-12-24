const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Article = require('./models/Article')

mongoose.connect("mongodb+srv://Fares:F%40200214%40hlfm@cluster0.u29zl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected sucsess")
}
).catch((error)=>{
    console.log('error with connecting with the DB', error)
})
 

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req,res)=>{
    let num = ""
    for(let i = 0; i<=100; i++){
        num += i + " - "
    }
    res.render('numbers',{
        num: num,
        name: 'Yarob'
    })
})

// Articles End Points
app.post('/articles',async(req,res)=>{
    const newArticle = new Article()
    const artName = req.body.articleName
    const artTitle = req.body.articleTitle
    newArticle.title = artTitle
    newArticle.body = artName
    newArticle.numberOfLikes = 0
    await newArticle.save()
    res.json(newArticle)
})


app.get('/articles',async(req,res)=>{
     const articles =  await Article.find()
    console.log("The articles are"+ articles)
    res.render('articles',{articles: articles})
})

app.get('/article/',async(req,res)=>{
    const articleId = req.body.articleId
    const article = await Article.findById(articleId)
    res.json(article)
})

app.delete('/article',async(req,res)=>{
    const articleId = req.body.articleId
    const article = await Article.findByIdAndDelete(articleId)
    res.json(articleId)
    
})


app.listen(3000, ()=>{
    console.log("I am listening in port 3000")
})


