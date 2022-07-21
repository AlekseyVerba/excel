import { Controller, Post, Body, Get, UseGuards, Param, ParseIntPipe } from "@nestjs/common";
import { RegisterOrLoginUserDto } from "./dto/user.dto"
import { UserService } from "./user.service"
import { ValidationPipe } from "../pipes/validation.pipe"
import { IUserWithoutPass, IUserWithToken } from "./types/"
import { ISuccessResponse } from "../types/response.interface"
import { AuthGuard } from "../guards/auth.guard"
import { UserProperty } from "../decorators/userProperty.decorator"

@Controller("user")
export class UserController {

    constructor(
        private userService: UserService,

    ){}




    @Post("create")
    async create(
        @Body(new ValidationPipe()) createUserDto: RegisterOrLoginUserDto,
    ): Promise<ISuccessResponse<IUserWithoutPass>> {
        const newUser = await this.userService.create(createUserDto)
        return {
            status: true,
            message: "Успешно",
            data: newUser
        }
    }


    @Post("login")
    async login(
        @Body(new ValidationPipe()) loginUserDto: RegisterOrLoginUserDto
    ): Promise<ISuccessResponse<IUserWithToken>> {
        const user = await this.userService.login(loginUserDto)
        const token = this.userService.getUserWithToken(user)
        return {
            status: true,
            message: "Успешно",
            data: {
                user,
                token
            }
        }
    }

    @Get("auth")
    @UseGuards(AuthGuard)
    async auth(
        @UserProperty("id") idUser: number
    ): Promise<ISuccessResponse<IUserWithToken>> {
        console.log(idUser)
        const currentUser = await this.userService.getUserById(idUser)
        const token = this.userService.getUserWithToken(currentUser)
        return {
            status: true,
            message: "Успешно",
            data: {
                user: currentUser,
                token
            }
        }
    }

    @Get(":id")
    async getUserByID(
        @Param("id", ParseIntPipe) id: number
    ): Promise<IUserWithoutPass> {
        return this.userService.getUserById(id)
    }

}