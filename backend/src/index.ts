import express, { Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './secrets';
import router from './router';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/error';
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: "http://localhost:5173"
}));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use('/api', router);

export const prisma = new PrismaClient();

app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})

app.use(errorMiddleware);

app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });