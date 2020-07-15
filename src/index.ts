import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';

dotenv.config();

const app: any = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}...`);
    } else {
        console.error(`Falha na inicialização do servidor.`)
    }
});