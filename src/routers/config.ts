import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './index.routes';

const corsConfig = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
app.use(helmet());
routes(app);

export default app;