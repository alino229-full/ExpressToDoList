import express,{ Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import router from './routes/index';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';




const cors = require('cors');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 15 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false,
});
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],

    },
}));
app.use(compression());

app.use(limiter);
app.use(morgan('combined'))
app.use(express.json());

app.use('/', router); // Utilise le routeur importé ici

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }else{
        res.status(500).send(err.stack);
        // res.status(500).send('Une erreur est survenue.'); à afficher en production
    }

};

app.use(errorHandler);

export default app;
