import express from 'express'
import "dotenv/config"
import cors from "cors";
import sequelize from './config/dbConnection.js';
import { articlesRouter } from './routes/articleRoutes.js';

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
}))
app.use(express.static('public'));
app.use("/images",express.static("images"))


try {
    await sequelize.authenticate();
    console.log("Connection established");
  } catch (error) {
    console.log("Unable to connect to database");
  }


 app.use('/articles',articlesRouter)


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });