import { IsString } from 'class-validator';
export default class CreateTodoDto {
    @IsString()
    public title: string;
    
    @IsString()
    public description: string;
}