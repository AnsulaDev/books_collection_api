import { db } from "../utils/db.server";
import type { Author } from "./author.model"

type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author: Author;
    //   authorId: number;
};

type BookWrite = {
    title: string;
    datePublished: Date;
    authorId: number;
    isFiction: boolean;
};

//to get all books list
export const listBooks = async(): Promise<BookRead[]> => {
    return db.book.findMany({
        select:{
            id:true,
            title:true,
            datePublished:true,
            isFiction:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                }
            },
        },
    });
};

//to get a single book
export const getBooks = async(id:number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where:{
            id,
        },
        select:{
            id:true,
            title:true,
            datePublished:true,
            isFiction:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                }
            },
        },
    });
};

//to create a book

export const createBook = async (book: BookWrite): Promise<BookRead> => {
    const { title, authorId, datePublished, isFiction } = book;
    const parsedDate: Date = new Date(datePublished);

    return db.book.create({
        data: {
            title,
            authorId,
            isFiction,
            datePublished: parsedDate,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
            },
        },
    });
};


//to update a book
export const updateBook = async (
    book: BookWrite,
    id: number
    ): Promise<BookRead> => {
        const { title, isFiction, datePublished, authorId } = book;
        return db.book.update({
        where: {
            id,
        },
        data: {
            title,
            isFiction,
            datePublished,
            authorId,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
            },
        },
    });
};


//to delete a book

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id,
        },
    });
};