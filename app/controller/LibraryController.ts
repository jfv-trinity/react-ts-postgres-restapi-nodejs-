import { NextFunction, Request, Response } from "express"
import { Library } from "../entity/Library"
import { AppDataSource } from "../data-source"

export class LibraryController {

    private libraryRepository = AppDataSource.getRepository(Library)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //return this.libraryRepository.findOne(request.params.id)
        return this.libraryRepository.findOneBy({ id: request.params.id })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.libraryRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const bookToRemove = await this.libraryRepository.findOneBy({ id: request.params.id })
        if (!bookToRemove) throw Error('book does not exist in library')
        await this.libraryRepository.remove(bookToRemove)
    }

    

}