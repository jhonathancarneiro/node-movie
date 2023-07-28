import "express-async-errors"
import express, { Request, Response } from 'express';
import { AppError } from "./erros/error";
import { routes } from './routes/main';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({ extended: true }))

app.use(routes);


app.use((err: Error, request: Request, response: Response, next: any) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error - ${err.message}",
  });
});

app.listen(process.env.PORT || 3333, () => console.log("server is running on port 3333"));