const route = require('express').Router()
const checkToken = require('../middleware/tokenVerif')
const slugify = require("slugify")
const Post = require('../../models').post

route.get('/get', async (req, res)=>{
    const posts = await Post.findAll()
    res.send(posts)
})

route.get('/:postSlug', async (req, res)=>{
    try {
        await Post.findOne({where: { slug : req.params.postSlug }}).then(result=>{
            if(!result) res.status(404).send({msg:"Nothing Founded!"})
            res.status(200).send(result)
        }).catch(err=>{
            res.status(400).send({
                error: err
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post('/create', checkToken, async (req, res)=>{
    try {
        await Post.create({
            author_id: 1,
            title: req.body.title,
            slug: slugify(req.body.title, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: false,
                locale: 'vi'
              }),
            content: req.body.content
        }).then(result=>{
            res.status(201).send("Post Create Successfuly")
        }).catch(err=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put('/update/:postId/:authorId', checkToken, async (req, res)=>{
    try {
        await Post.update({
            title: req.body.title,
            slug: slugify(req.body.title, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: false,
                locale: 'vi'
              }),
            content: req.body.content
        }, {where : {id: req.params.postId, author_id: req.params.authorId}}).then(result=>{
            if(result[0] === 0) res.status(404).send("Nothing Founded")
            res.status(200).send("Post Updated Successfuly")
        }).catch(err=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete('/delete/:postId/:authorId', checkToken, async (req, res)=>{
    try {
        await Post.destroy({where: { id : req.params.postId, author_id : req.params.authorId }}).then(result=>{
            if(!result) res.status(404).send({msg:"Nothing Founded!"})
            res.status(200).send({msg:"Your Post Successfuly Deleted!"})
        }).catch(err=>{
            res.status(400).send({
                error: err
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = route