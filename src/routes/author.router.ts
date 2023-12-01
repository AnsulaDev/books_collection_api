import express,{Request,Response, response} from "express";
import {body, validationResult} from "express-validator";

import * as AuthorService from "../models/author.model";

export const authorRouter = express.Router();

//get list of all the authors

authorRouter.get("/",async(req:Request, res:Response) =>{
    try{
        const authors = await AuthorService.listAuthores();
        return res.status(200).json(authors);
    }catch(error:any){
        return res.status(500).json(error.message);
    }
});

//get a single author by ID

authorRouter.get("/:id",async(req:Request, res:Response)=>{
    const id:number = parseInt(req.params.id,10);
    try{
        const author = await AuthorService.getAuthor(id);
        if(author){
            return res.status(200).json(author);
        }
        return res.status(404).json("author could not be found");
    }
    catch(error:any){
        return res.status(500).json(error.message);
    }

});

//to create author
authorRouter.post("/",body("firstName").isString(),body("lastName").isString(),
    async (req:Request, res:Response) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const author  = req.body;
            const newAuthor = await AuthorService.createAuthor(author);
            return res.status(201).json(newAuthor);
        }
        catch(error:any){
            return res.status(500).json(error.message);
        }

    });

//to update author

authorRouter.put("/:id",
body("firstName").isString(),body("lastName").isString(),
async (req:Request, res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const id: number= parseInt(req.params.id, 10);
    try{
        const author = req.body;
        const updatedAuthor = await AuthorService.updateAuthor(author, id);
        return res.status(200).json(updatedAuthor);
    }
    catch(error:any){
        return res.status(500).json(error.message);
    }
});

//to delete author

authorRouter.delete("/:id", async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id, 10);
    try{
        await AuthorService.deleteAuthor(id);
        return res.status(204).json(`Author id:${id} has been successfully deleted`);
    }
    catch(error:any){
        return res.status(500).json(error.message);
    }
});