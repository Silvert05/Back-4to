import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, Matches } from "class-validator"

export class CustomersDto {
    @IsString()
    @Matches(/^[A-Za-az<dfkjnjndjndnjKJNKJN]+$/, {message :'El nombre solo debe de contener  letras '})
    name:string;
    
    @Type(()=> Number)
    @IsInt({message:'La edad  deb de ser  un  numero entero  '})
    age:number;

    @IsDate()
    @Type(()=> Date)
    @IsDate({message:'La fecha debe de ser  un  numero entero  '})
    birthday:Date;
    
            
}
