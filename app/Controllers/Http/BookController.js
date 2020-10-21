'use strict'

const Book = use('App/Models/Book');

class BookController {

    async index({ request , response }){
        const books = await Book.query().all();

        return response.status(200).json(books);
    };

    async show ({ request , response , params}){
        const book =  await Book.query().where('id', params.bookId).first();

        if(!book){
            return response.status(400).json({'message':'Invalid book id'});
        }else{
            return response.status(200).json(book);
        }
    };

    async update({ request , response , params}){
        const book =  await Book.query().where('id', params.bookId).first();
        const body = request.post();
        book.title = body.title;
        book.quantity = body.quantity;
        await book.save();

        return response.status(200).json(book);
    }

    async create({ request , response}){
        const { title , quantity } = request.post();

        const book = new Book();
        book.title = title;
        book.quantity = quantity;
        await book.save();

        return response.status(201).json(book);
    }


}

module.exports = BookController
