import { body, param, ValidationChain } from "express-validator"
import { BookController } from "./controller/BookController"
import { UserController } from "./controller/UserController"
import { ChapterController } from "./controller/ChapterController"
import { LibraryController } from "./controller/LibraryController"

export const Routes = [{

    //User Routes
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    },


    // Book Routes
    {
    method: "get",
    route: "/books",
    controller: BookController,
    action: "all",
    },
{
    method: "get",
    route: "/books/:id",
    controller: BookController,
    action: "one",
    }, 
{
    method: "post",
    route: "/books",
    controller: BookController,
    action: "save",
    }, 
{
    method: "delete",
    route: "/books/:id",
    controller: BookController,
    action: "remove",
    }, 

    //Chapter Routes
{
    method: "get",
    route: "/chapters",
    controller: ChapterController,
    action: "all",
    }, 
{
    method: "get",
    route: "/chapters/:id",
    controller: ChapterController,
    action: "one",
    }, 
{
    method: "post",
    route: "/chapters",
    controller: ChapterController,
    action: "save",
    }, 
{
    method: "delete",
    route: "/chapters/:id",
    controller: ChapterController,
    action: "remove",
    }, 

    //Library Routes

    {
    method: "get",
    route: "/libraries",
    controller: LibraryController,
    action: "all",
    }, 
{
    method: "get",
    route: "/libraries/:id",
    controller: LibraryController,
    action: "one",
    }, 
{
    method: "post",
    route: "/libraries",
    controller: LibraryController,
    action: "save",
    }, 
{
    method: "delete",
    route: "/libraries/:id",
    controller: LibraryController,
    action: "remove",
    }, 
]