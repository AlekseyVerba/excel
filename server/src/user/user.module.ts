import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { UserService } from "./user.service"
import { JwtModule } from "../jwt/jwt.module"

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}