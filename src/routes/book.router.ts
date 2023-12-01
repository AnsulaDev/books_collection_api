import express,{Request, Response} from "express";
import {body, validationResult} from "express-validator";

import * as BookModel from "../models/book.model";

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

//to get a book by Id

bookRouter.get("/:id", async(req:Request, res:Response) =>{
    const id:number = parseInt(req.params.id, 10);
    try{
        const book = await BookModel.getBooks(id);
        if(book){
            return res.status(200).json(book);
        }
        return res.status(404).json(`the book ID:${id} is not found.`) 
    }
    catch(error:any){
        res.status(500).json(error.message)
    }
});

//to create a book 
bookRouter.post(
    "/",
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const book  = req.body;
            const newBook = await BookModel.createBook(book);
            return res.status(201).json(newBook);
        }
        catch(error:any){
            return res.status(500).json(error.message);
        }
    }
);


//upate a book
bookRouter.put("/:id",
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async(req:Request, res:Response) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const id:number = parseInt(req.params.id, 10);
        try{
            const book = req.body;
            const updatedBook = await BookModel.updateBook(book,id);
            return res.status(201).json(updatedBook);
        }
        catch(error:any){
            res.status(500).json(error.message)
        }
    });


//to Delete a book

bookRouter.delete("/:id", async(req:Request,res:Response) =>{
    const id:number = parseInt(req.params.id, 10);
    try{
        await BookModel.deleteBook(id);
        return res.status(204).json(`book with id:${id} has been deleted`);
    }
    catch(error:any){
        res.status(500).json(error.message);
    }
});