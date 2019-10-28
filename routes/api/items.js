const express = require('express');
const router = express.Router();

// Bring in item model, need it to make queries
const Item =  require('../../models/Item');

// @route GET api/items
// @desc  Get all Items
// @access Public
// the '/' represents api/items
router.get('/', (req, res) => {
  Item.find()
    .sort( {date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc  Create a item
// @access Public
// the '/' represents api/items
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc  Delete an item
// @access Public
// the '/' represents api/items
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));  
});
// success response is up to you we can return what ever 

module.exports = router;