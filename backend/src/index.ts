import express, { Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './secrets';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');



app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})


app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });