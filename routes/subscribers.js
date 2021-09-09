const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
    try {
        // get all the data for all subscribers
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        // status 500 throws error from the server in a form of json
        res.status(500).json({ message: err.message })
    }
})

// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel,
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        // error thrown when there's something wrong with the user input not the serve 
        res.status(400).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Deleted Subscriber' });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.mame = req.body.name;
    } 
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete("/:id", getSubscriber, (req, res) => {});

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            // 404 error thrown when there no subscriber with such data
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;