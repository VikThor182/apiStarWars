import createError from 'http-errors'
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import './db.js'
import { films } from './routes/films.js'
import { species } from './routes/species.js'
import { starships } from './routes/starships.js'
import { planets } from './routes/planets.js'
import { transports } from './routes/transports.js'
import { vehicles } from './routes/vehicles.js'
import index from './routes/routes.js'
import { fileURLToPath } from 'url';

var app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/films', films);
app.use('/species', species);
app.use('/starships', starships);
app.use('/planets', planets);
app.use('/transports', transports);
app.use('/vehicles', vehicles);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log("Server has started!")
})

