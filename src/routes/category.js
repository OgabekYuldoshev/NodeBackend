const route = require('express').Router()
const checkToken = require('../middleware/tokenVerif')
const slugify = require("slugify")
const Category = require('../../models').category

route.get('/get', async (req, res)=>{
    const posts = await Category.findAll()
    res.send(posts)
})

route.get('/:slug', async (req, res)=>{
    try {
        await Category.findOne({where: { slug : req.params.slug }}).then(result=>{
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
        await Category.create({
            title: req.body.title,
            slug: slugify(req.body.title, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: false,
                locale: 'vi'
              }),
        }).then(result=>{
            res.status(201).send("Category Create Successfuly")
        }).catch(err=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put('/update/:slug', checkToken, async (req, res)=>{
    try {
        await Category.update({
            title: req.body.title,
            slug: slugify(req.body.title, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: false,
                locale: 'vi'
              }),
        }, {where : {id: req.params.slug}}).then(result=>{
            if(result[0] === 0) res.status(404).send("Nothing Founded")
            res.status(200).send("Category Updated Successfuly")
        }).catch(err=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete('/delete/:slug', checkToken, async (req, res)=>{
    try {
        await Category.destroy({where: { id : req.params.slug }}).then(result=>{
            if(!result) res.status(404).send({msg:"Nothing Founded!"})
            res.status(200).send({msg:"Your Category Successfuly Deleted!"})
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