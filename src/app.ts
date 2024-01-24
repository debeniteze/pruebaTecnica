import "dotenv/config"
import express from "express"
import cors from "cors"
import {router} from './routes/anomalia.routes'
import db from './config/mongo.config'
const PORT = process.env.PORT || 3001;
const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(router);

db().then(() => console.log('database inicializada'))
app.listen(PORT, () => console.log(`Inicio prueba tecnica ${PORT}`))