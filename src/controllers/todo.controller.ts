import { Request, Response, NextFunction } from "express";
import * as uuidv4 from 'uuid/v4';
import * as AWS from 'aws-sdk';
var awsconfig = {
    "accessKeyId": process.env.accessKeyId,
    "secretAccessKey": process.env.secretAccessKey,
    "region":"eu-west-1",
    "endpoint": "http://dynamodb.eu-west-1.amazonaws.com"
}
AWS.config.update(awsconfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

export let getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await dynamodb.scan({TableName:'besttododb'}).promise();
        res.send(data);
    } catch (error) {
        console.log(error)
    }   
}

export let addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {title, description} = req.body;
        const params = {
            TableName:'besttododb',
            Item:{
                id: uuidv4(),
                title,
                description
            }
        }
        const data = await dynamodb.put(params).promise();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
}