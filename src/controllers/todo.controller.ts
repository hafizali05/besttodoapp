import * as express from 'express';
import { Request, Response, NextFunction } from "express";
import Todo from "../tododb";
import TodoNotFoundException from "../exceptions/TodoNotFoundException";


export let getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const data = await dynamodb.scan({TableName:'besttododb'}).promise();
        const data = await Todo.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }   
}


export let addTodo = async (req: Request, res: Response, next: NextFunction) => {
    let {title,description} = req.body;
    let todo = new Todo({title,description})
    try {
        const data = todo.save();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export let updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id,title, description} = req.body;
        const data = await Todo.findByIdAndUpdate(id, {title, description});
        if(data){
            res.send(data);
        } else {
            next(new TodoNotFoundException(id));
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export let deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.body;
        const data = await Todo.deleteOne({id})
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}