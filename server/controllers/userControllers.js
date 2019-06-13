const User = require('../models/user')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register(req, res) {        
        const {name, email, password} = req.body

        User.create({
            name, email, password
        })
        .then(user=> {
            res.status(201).json(user)
        })
        .catch(err => {
            if (err.errors.email) {
                res.status(409).json({ err: err.errors.email.reason });
            } else if(err.errors.password) {
                res.status(409).json({ err: err.errors.password.message });
            } else {
                res.status(500).json(err);
            }
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        User.findOne({
            email
        })
        .then(user => {
            if(!user) {
                throw 'Username/password wrong'
            } else {
                if( Helper.comparePassword(password, user.password) ) {
                    let access_token = Helper.generateJWT({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        id: user._id
                    });

                    res.status(200).json(access_token)
                }else{
                    res.status(400).json({ err: "Username/Password wrong" });
                }
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static loginGoogle(req, res) {
        let newEmail = ''
        let newName = ''

        client.verifyIdToken({
                idToken: req.headers.token,
                audience: process.env.CLIENT_ID
            })
            .then(function(ticket) {
                newEmail = ticket.getPayload().email
                newName = ticket.getPayload().name
                return User.findOne({
                    email: newEmail
                })
            })
            .then(function(userLogin) {
                if (!userLogin) {
                    return User.create({
                        name: newName,
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    return userLogin
                }
            })
            .then(function(newUser) {
                let access_token = Helper.generateJWT({
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    id: newUser._id
                });

                res.status(200).json(access_token)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static list(req, res) {
        User.find({})
        .then(user=> {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({msg:err})
        })
    }

    static findOne(req, res) {
        const id = req.params.id ? req.params.id : req.headers.id

        User
        .findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete(req, res) {
        User
        .findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = UserController
