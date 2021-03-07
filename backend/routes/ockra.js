const router = require('express').Router();
let OckRa = require('../models/ockra.model');


router.route('/').get((req,res) => {

OckRa.find().then(users => res.json(users))
.catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {

    const roomname = req.body.roomname;
    const date = req.body.date;
    const chart = req.body.date;

    const newOckChart = new OckRa({

        roomname,date,chart

    });

    newOckChart.save()
    .then( () => res.json('OckRa Added!'))
    .catch (err => res.status(400).json('Error: '+ err));

});

router.route('/:id').get((req,res) => {
    OckRa.findById(req.param.id)
    .then(ockra => res.json(ockra))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').delete((req,res) => {

    OckRa.findByIdAndDelete(req.param.id)
    .then(() => res.json("ockra deleted!"))
    .catch(err => res.status(400).json('Error: ' +err));

});

router.route('/update/:id').post((req,res) => {
    OckRa.findById(req.params.id)
    .then( ockra => {
        ockra.roomname = req.body.roomname;
        ockra.date = req.body.date;
        ockra.chart = req.body.chart;

        ockra.save()
        .then( () => res.json("ockra updated!"))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});

module.exports = router;