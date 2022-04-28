import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";


@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){ }
    @Post("login")
    login(@Body() dto:LoginDto){
        // return dto;
        return this.authService.login(dto)
    }

    @Post("register")
    register(@Body() dto:RegisterDto){
        console.log(dto);
        
        // return dto;
        return this.authService.register(dto)
    }

    
    @Post("logout")
    logout(){
        return this.authService.logout();
    }
}