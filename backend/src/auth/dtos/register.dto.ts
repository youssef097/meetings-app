import { IsEmail, isEmail, isEmpty, IsNotEmpty, Matches, MaxLength, MinLength  } from "class-validator";


export class RegisterDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string

    @IsEmail()
    @IsNotEmpty()
    name: string
}