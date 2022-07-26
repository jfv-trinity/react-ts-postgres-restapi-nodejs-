import { NextFunction, Request, Response } from "express"
import { Book } from "../entity/Book"
import { Bookchapters } from "../entity/Bookchapters"
import { AppDataSource } from "../data-source"

export class ChapterController {

    private bookRepository = AppDataSource.getRepository(Book)
    private chapterRepository = AppDataSource.getRepository(Bookchapters)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.chapterRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.chapterRepository.findOneBy({ id: request.params.id })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.chapterRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const chapterToRemove = await this.chapterRepository.findOneBy({ id: request.params.id })
        if (!chapterToRemove) throw Error('chapter does not exist')
        await this.chapterRepository.remove(chapterToRemove)
    }

    

}