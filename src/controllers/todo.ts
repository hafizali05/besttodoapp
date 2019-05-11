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
        // const {Item} = data;
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error)
    }   
}
 







// export default class TodoController{
//     public async putData(req,res){
//         console.log(req,res);
//         return;
//         let params = {
//             TableName:'besttododb',
//             Item:{
//                 "id":uuidv4(),
//                 "title": "from the contoller",
//                 "description": "controller description"
//             }
//         };
//         try {
//             const insert = await dynamodb.put(params).promise();
//             console.log(insert);
//         } catch (error) {
//             console.log(error);
//         }           
//     }
// }