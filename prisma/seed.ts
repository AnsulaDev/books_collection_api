import { db } from "../src/utils/db.server";

type Author={
    firstName:string;
    lastName:string
};

type Book = {
    title:string;
    isFiction:boolean;
    datePublished:Date;
};

async function seed(){
    await Promise.all(
        getAuthor().map((author) =>{
            return db.author.create({
                data:{
                    firstName:author.firstName,
                    lastName:author.lastName
                }
            })
        })
        
    );
    const author = await db.author.findFirst({
        where:{
            firstName:"Yuval Noah"
        }
    });
    await Promise.all(
        getBook().map((book)=>{
            const {title, isFiction, datePublished} = book;
            return db.book.create({
                data:{
                    title,
                    isFiction,
                    datePublished,
                    authorId: author.id,
                }
            })
        }) 
    )
}

seed();

function getAuthor(): Array<Author>{
    return[
        {
            firstName:"jhon",
            lastName:"Doe"
        },
        {
            firstName:"william",
            lastName:"Shakespeare"
        },
        {
            firstName:"Yuval Noah",
            lastName:"Harari"
        },
    ];
}

function getBook():Array<Book>{
    return[
        {
            title:"Sapiens",
            isFiction:false,
            datePublished:new Date(),
        },
        {
            title:"Homo Deus",
            isFiction:false,
            datePublished:new Date()
        },
        {
            title:"The Ugly Duckling",
            isFiction:true,
            datePublished:new Date()
        },
    ];
}