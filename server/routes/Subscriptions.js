const express = require('express');
const router = express.Router();



const { Subscriptions } = require('../models');

router.get('/', async (req, res) => {
    const listOfSubscriptions = await Subscriptions.findAll();
    res.json(listOfSubscriptions);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Subscriptions.create(post);
    res.json(post);
})

module.exports = router;