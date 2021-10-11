const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
                Course.find({}).sortable(req),
                Course.countDocumentsDeleted()
            ])
            .then(
                ([courses, deletedCount]) =>
                    res.render('me/stored-courses', {
                        deletedCount,
                        courses: multipleMongooseToObject(courses)
                    })
            )
            .catch(next);

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: multipleMongooseToObject(courses)
        //     }))
        //     .catch(next);

        // Course.countDocumentsDeleted({})
        //     .then(deletedCount => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => { });

    }

    //[GET] /me/trash/courses
    trashedCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trashed-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController();
