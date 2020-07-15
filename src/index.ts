import dotenv from 'dotenv';
import express from 'express';


const app: any = express();
app.use(express.json());

app.listen(3003);