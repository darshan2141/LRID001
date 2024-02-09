require('./config/mongoose');
const express = require('express');
const app = express();
const userRouters = require('./routers/users');
const morgon = require('morgan');
const cors = require('cors');
const multer = require('multer');

// middleware
app.use(cors());
app.use(morgon('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false ,limit : 10000 }));

// Multer middleware for handling form data
// const storage = multer.memoryStorage();
// const multerMiddleware = multer({ storage: storage });

// router
app.use('/auth',userRouters);

// app.use((req,res,next)=>{
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// })

// app.use((error,req,res,next)=>{
//     res.status(error.status || 500);
//     res.json({
//         error : {
//             message : error.message
//         }
//     })
// })

app.use((req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Not found'
        }
    })
})

app.listen(8001, (req, res, next) => {
    console.log("App is running");
})
