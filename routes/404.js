const express = require('express');
// const path = require('path');


// const rootDir = require('../util/path')

const router = express.Router();

router.get('*',(req, res, next)=>{
    res.status(404).render('404')
    // res.status(404).sendFile(path.join(rootDir, 'view', '404.html'))
})


module.exports = router;