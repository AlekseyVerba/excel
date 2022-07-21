import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { Repository } from "typeorm"
import { RegisterOrLoginUserDto } from "./dto/user.dto"
import { IUserWithoutPass, IUserForToken } from "./types"
import { IErrorResponse } from "../types/response.interface"
import { compareSync } from "bcryptjs"
import { JwtService } from "../jwt/jwt.service"


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}


    async create(user: RegisterOrLoginUserDto): Promise<IUserWithoutPass> {

        const candidateUser = await this.userRepository.findOneBy({email: user.email})

        if (candidateUser) {
            throw new HttpException(`Пользователь с данным email - '${user.email}' уже создан`, HttpStatus.BAD_REQUEST)
        }
        const newUser = Object.assign(new User(), user)
        const newUserRes = await this.userRepository.save(newUser)
        return this.removePassword(newUserRes)
    }

    async login(user: RegisterOrLoginUserDto): Promise<IUserWithoutPass> {

        const candidateUser = await this.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", {email: user.email})
            .getOne()

        if (!candidateUser) {
            const objError: IErrorResponse = {
                status: false,
                message: "Пользователь с данным email не найден",
                statusCode: HttpStatus.NOT_FOUND
            }
            throw new NotFoundException(objError)
        }

        const arePasswordsEqual = compareSync(user.password, candidateUser.password)

        if (!arePasswordsEqual) {
            const objError: IErrorResponse = {
                status: false,
                message: "Пароль невереный",
                statusCode: HttpStatus.BAD_REQUEST
            }
            throw new BadRequestException(objError)
        }



        return this.removePassword(candidateUser)
    }


    async getUserById(id: number): Promise<IUserWithoutPass | undefined> {
        const user = await this.userRepository.findOneBy({id})
        
        if (!user) {
            return undefined
        }

        return this.removePassword(user)
    }

    getUserWithToken(user: IUserWithoutPass): string {
        const userForToken: IUserForToken = {
            id: user.id,
            email: user.email
        }
        const token = this.jwtService.createJWT({payload: userForToken})
        return token
    }

    removePassword(user: User): IUserWithoutPass{
        const userNew = JSON.parse(JSON.stringify({...user}))
        delete userNew.password
        userNew as IUserWithoutPass
        return userNew
    }


}