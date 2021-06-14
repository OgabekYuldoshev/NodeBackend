const route = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../middleware/tokenVerif')
const Users = require("../../models").users


route.post("/reg", async(req, res)=>{
    try {
        if(req.body.password.length < 6){
            res.status(400).send("Password must be 6 chapter!")
        }
        if(req.body.password.includes(" ")){
            res.status(400).send("Password must not be space!")
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        await Users.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashPassword })
            .then(()=>{
            res.status(201).send("New User Created")
        }).catch(err=>res.status(400).send(err.errors[0].message))
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post("/login", async(req, res)=>{
    try {
        const user = await Users.findOne({where:{email:req.body.email}})
        if(!user) res.status(404).send("Email or Password is incorrect!")
        let checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(!checkPassword) res.status(404).send("Email or Password is incorrect!")
        var token = jwt.sign(
            {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                intro: user.intro
            }, process.env.MYTOKENSECRET, { expiresIn: '1h' });
            // res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.send({
            msg: "You are successfuly logged in",
            token: token
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

// route.get("/logout", checkToken, async(req, res)=>{

// })



route.delete("/user/:id", checkToken, async(req, res)=>{
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=>{
            res.send("User Deleted!")
        }).catch(err=>{
            res.status(500).send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get("/user", checkToken, async (req, res)=>{
    const user = await Users.findOne({where:{id: req.user.id}})
    res.send({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            intro: user.intro
    })
})






module.exports = route