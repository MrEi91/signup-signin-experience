'use strict'

const express = require('express')

const model = require('../models/user')

const hash = require('password-hash')

const secret = 'abcdefg'

const jwt = require('jsonwebtoken')

module.exports = {

  login: function (req, res) {
    let user = {
      user: req.body.username
    }
    let pass = {
      pass: req.body.password
    }

    model.findOne(user)
      .then(function (user) {
        if (!user) {
          res.json({
            usernotfound: true
          })
        }
        if (user) {
          if (hash.verify(req.body.password, user.pass)) {
            let token = jwt.sign({
              username: user.user
            }, secret, {})

            res.json({
              token: token
            })
          } else {
            res.json({
              passerror: true
            })
          }
        }
      }).catch(function (err) {
        if (err) {
          res.json({
            err: err
          })
        }
      })
  },
  register: function (req, res) {
    var hashed = hash.generate(req.body.password)

    let user = {
      user: req.body.username,
      pass: hashed
    }

    model.create(user)
      .then(function (user) {
        if (user) {
          res.json({
            message: 'SUCCESS REGISTER !',
            data: user
          })
        }
      })
      .catch(function (err) {
        if (err) {
          res.json({
            err: err
          })
        }
      })
  },
  verify: function (req, res) {
    let params = req.params.token

    jwt.verify(params, secret, function (err, decoded) {
      if (decoded) {
        res.json({
          user: true
        })
      }
      if (!decoded) {
        res.json({
          user: false
        })
      }
      if (err) {
        console.log(err)
      }
    })
  }

}
