import {db} from "../utils/db.server";

type Author ={
    id:number;
    firstName:string;
    lastName:string;
}

//to find all authores.
export const listAuthores = async (): Promise<Author[]> =>{
    return db.author.findMany({
        select:{
            id:true,
            firstName:true,
            lastName:true,
        },
    });
};

//to find author by id.
export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
        id,
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
        },
    });
};


//to create author

export const createAuthor = async(author: Omit<Author, "id">): Promise<Author> =>{
    const {firstName,lastName} = author;
    return db.author.create({
        data:{
            firstName,
            lastName,
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
        },
    });
};


//to update author

export const updateAuthor = async(author:Omit<Author,"id">, id:number):Promise<Author> =>  {
    const {firstName,lastName} =author;
    return db.author.update({
        where:{
            id,
        },
        data:{
            firstName,
            lastName
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
        }
    });
            
};



//to delete author
export const deleteAuthor = async(id:number):Promise<void> =>{
    await db.author.delete({
        where:{
            id,
        }
    });
};