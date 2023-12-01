import express,{Request, Response} from "express";
import {body, validationResult} from "express-validator";

import *as BookModel from "../models/book.model";

export const bookRouter = express.Router();


//to get all books list

bookRouter.get("/", async(req:Request, res:Response)=>{
    try{
        const books = await BookModel.listBooks();
        return res.status(200).json(books);

    }
    catch(error:any){
        return res.status(500).json(error.message);
    }
});