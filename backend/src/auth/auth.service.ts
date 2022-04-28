import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dtos/register.dto";
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

    }



    async login(dto: LoginDto) {        
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );


        const pwMatches = argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

        
            return this.signToken(user.id, user.email);
    }

    async register(dto: RegisterDto) {
        console.log(dto)
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    hash,
                    email: dto.email
                }
            })
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(
                        "Credentials taken"
                    )
                }
            }
            throw error;
        }

    }

    logout() {
        return "You have been logged out!"
    }

    async signToken(userId, email) {

        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get("JWT_SECRET")

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret
        })
        return { access_token: token }
    }
}