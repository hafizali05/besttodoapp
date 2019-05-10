import * as uuidv4 from 'uuid/v4';
import { DynamoDB } from 'aws-sdk';
var awsconfig = {
    "accessKeyId": process.env.accessKeyId,
    "secretAccessKey": process.env.secretAccessKey,
    "region":"eu-west-1",
    "endpoint": "http://dynamodb.eu-west-1.amazonaws.com"
}
AWS.config.update(awsconfig);
const dynamodb = new DynamoDB.DocumentClient();

let putdata = async function(){
    var params = {
        TableName:'besttododb',
        Item:{
            "id":uuidv4(),
            "title": "hesdssllo title",
            "description": "sdds vhello desc"
        }
    };
    try {
        const insert = await dynamodb.put(params).promise();
        console.log(insert);
    } catch (error) {
        console.log(error);
    }   
}
putdata();


