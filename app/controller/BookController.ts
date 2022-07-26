import { NextFunction, Request, Response } from "express"
import { Book } from "../entity/Book"
import { Bookchapters } from "../entity/Bookchapters"
import { Bookgenres } from "../entity/Bookgenres"
import { AppDataSource } from "../data-source"
import { LessThan } from "typeorm"

export class BookController {

    private bookRepository = AppDataSource.getRepository(Book)
    private genreRepository = AppDataSource.getRepository(Bookgenres)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //return this.bookRepository.findOne(request.params.id)
        return this.bookRepository.findOneBy({ id: request.params.id })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        console.log(request.body)
        return this.bookRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const bookToRemove = await this.bookRepository.findOneBy({ id: request.params.id })
        if (!bookToRemove) throw Error('book does not exist')
        await this.bookRepository.remove(bookToRemove)
    }

    async findByIdLessThan(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find({ where: { id: LessThan(request.params.id) } })
    }

      async findByAuthor(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find({ where: { authorId: (request.params.author) } })
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.update(request.params.id, request.body);
    };

}