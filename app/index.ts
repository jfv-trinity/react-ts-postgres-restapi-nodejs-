import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { port } from "./config"
import { validationResult } from "express-validator"
import cors = require("cors")

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({ message: err.message, statusCode: err.status })
}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(cors());
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route,
            //route.validation,
            async (req: Request, res: Response, next: Function) => {
                try {
                // const errors = validationResult(req)
                // console.log(errors)
                // if (!errors.isEmpty()) {
                //     return res.status(400).json({ errors: errors.array() })
                // }
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)
            } catch (error) {
                next(error)
            }
            
        })
    })

    app.use(handleError);


    // setup express app here
    // ...

    // start express server
    app.listen(port)


    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Timber",
    //         lastName: "Saw",
    //         age: 27
    //     })
    // )

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24
    //     })
    // )

    console.log(`Express server has started on port ${port}.`)

}).catch(error => console.log(error))
