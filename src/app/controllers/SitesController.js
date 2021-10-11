const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class SitesController {
    //[GET] /home
    home(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next);

        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         res.status(500).json({ error: 'ERROR'})
        //     }

        // });


    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }

    //[GET] /contact
    contact(req, res) {
        res.send('News Details');
    }
}

module.exports = new SitesController();
