import { IsString, IsInt, IsEmail, IsNumber, Length } from 'class-validator';

export class RegisterOrLoginUserDto {
    @IsEmail({
    }, {message: 'Необходим Email'})
    email: string
    @IsString({message: "Необходима строка"})
    @Length(3, 12, {message: "Поле должно быть больше 3 символов и меньше 12"})
    password: string
}