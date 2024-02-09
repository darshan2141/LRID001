// const express = require('express');
// const userRouters = express.Router();
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// userRouters.post('/register', [
//     body('firstName').notEmpty().withMessage('First name is required'),
//     body('lastName').notEmpty().withMessage('Last name is required'),
//     body('email').isEmail().withMessage('Invalid email address format'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('confirmPassword')
//         .custom((value, { req }) => value === req.body.password)
//         .withMessage('Password and confirm password do not match'),
//     body('postalCode').notEmpty().withMessage('Postal code is required'),
// ], (req, res, next) => {

//     const errors = validationResult(req);
    
//     if (!errors.isEmpty()) {
//         const customErrors = errors.array().map(error => {
//           return {
//             type: 'field',
//             msg: error.msg,
//             path: error.param,
//             location: 'body',
//           };
//         });
  
//         return res.status(400).json({ errors: customErrors });
//       }

//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword,
//         postalCode: req.body.postalCode
//     })

//     user.save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message: 'User registered successfully',
//                 data: result
//             });
//         })
//         .catch(error => {
//             console.log("Error:", error);
//             res.status(500).json({
//                 error: error
//             });
//         });
// })

// module.exports = userRouters;


const express = require('express');
const userRouters = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

userRouters.post('/register', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        postalCode: req.body.postalCode
    })

    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'User registered successfully',
                data: result
            });
        })
        .catch(error => {
            const customErrors = {};
            for (const key in error.errors) {
                if (error.errors.hasOwnProperty(key)) {
                    customErrors[key] = { message: error.errors[key].message };
                }
            }

            res.status(500).json({
                errors: customErrors,
                _message: 'users validation failed',
                name: 'ValidationError',
                message: error.message
            });
        });
})

module.exports = userRouters;


