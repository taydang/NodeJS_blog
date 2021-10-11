const newsRouter = require('./news');
const coursesRouter = require('./courses');
const sitesRouter = require('./sites');
const meRouter = require('./me');


function route(app) {
  app.use('/me', meRouter);

  app.use('/news', newsRouter);

  app.use('/courses', coursesRouter);

  app.use('/', sitesRouter);
}

module.exports = route;