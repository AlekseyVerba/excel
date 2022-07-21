import { NestMiddleware, Injectable } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { JwtService } from "../jwt/jwt.service"
import { IUserForToken } from "../user/types/"

@Injectable()
export class GetUser implements NestMiddleware {

    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization
        if (!authHeader) {
            next()
            return
        }


        const token = authHeader.split(" ")[1]
        
        if (!token) {
            next()
            return
        }

        try {
            const user = this.jwtService.verifyJwt({token})
            req.user = user as IUserForToken
        } catch(e) {}


        next()
    }
    
}