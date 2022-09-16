import { NextFunction, Request, Response } from "express"
import { Library } from "../entity/Library"
import { AppDataSource } from "../data-source"
import { Equal } from "typeorm"

export class LibraryController {

    private libraryRepository = AppDataSource.getRepository(Library)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //return this.libraryRepository.findOne(request.params.id)
        return this.libraryRepository.findOneBy({ userId: request.params.id })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const bookToRemove = await this.libraryRepository.findOneBy({ id: request.params.id })
        if (!bookToRemove) throw Error('book does not exist in library')
        await this.libraryRepository.remove(bookToRemove)
    }

     async findByUser(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.find({ where: { userId: request.params.id } })
    }

    async findBookByUser(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.find({ where: { userId: request.params.id, bookId: request.params.bookId } })
    }

    async bookmark(request: Request, response: Response, next: NextFunction) {

        const existingBookMark = await this.libraryRepository.findOneBy({ userId: request.params.userId, bookId: request.params.bookId })
        console.log(existingBookMark);

        if (existingBookMark == null) {
            console.log("It does not exist")
            return this.libraryRepository.save(request.body)
        }
        else {
            console.log("It exists")
            await this.libraryRepository.remove(existingBookMark)
        }
        return existingBookMark;
    }
}