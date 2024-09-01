import express, { Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './secrets';
import { connect } from 'http2';
import router from './router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');



app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})

app.use('/api', router);


app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });