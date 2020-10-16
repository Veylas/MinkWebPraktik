const express = require('express');
const path = require('path');
const router = express.Router();




router.get('/', (req, res) => {
    const data = {
        username: 'Jes',
        age: 88
    };
    res.json(data);
});

router.post('/save', (req, res) => {
  //  res.send("API is working properly")
   console.log('Body: ', req.body);
    res.json({
        msg: 'We recieved your data'
    });
});


router.get('/name', (req, res) => {
    const data = {
        username: 'peterson',
        age: 53
    };
    console.log('name')
    res.json(data);
});


module.exports = router;