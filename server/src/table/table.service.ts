import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Table } from "./table.entity"
import { UpdateTableDto } from "./dto/UpdateTable.dto"
import { IUserForToken } from "../user/types/"
import { User } from "../user/user.entity"
import { IErrorResponse } from "../types/response.interface"
import { NAME_FOR_NEW_TABLE } from "../constant/"

@Injectable()
export class TableService {
    
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


    async createTable(user: IUserForToken, tableID: string): Promise<Table> {
        const nameForTable = await this.getNameForTable(user)
        const newTable: Table = Object.assign({}, new Table(), {ownUser: user.id, link: tableID, name: nameForTable})
        return await this.tableRepository.save(newTable)
    }

    async getNameForTable(user: IUserForToken): Promise<string> {
        const count = await this.tableRepository.createQueryBuilder("table")
                    .where("table.ownUser = :id", {id: user.id})
                    .andWhere("table.name like :name", {name: `%${NAME_FOR_NEW_TABLE}%`})
                    .getCount()
        return `${NAME_FOR_NEW_TABLE} (${count})`
    }

    async getTablesByIdUser(id: number): Promise<Table[]> {
        const query = await this.tableRepository
                    .createQueryBuilder("table")
                    .where("table.ownUser = :id", {id})
                    .getMany()
        return query
    }

    async getTableByLink(
        userID: number,
        linkID: string
    ): Promise<Table> {
        const table = await this.tableRepository.findOne({
            where: {
                link: linkID,
                ownUser: userID as any
            }
        })

        if (!table) {

            const errorObj: IErrorResponse = {
                message: "Таблицы не найдено",
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
            }
            throw new NotFoundException(errorObj)

        }

        return table

    }

    async updateTable(
        tableID: number,
        userID: number,
        updateTableDto: UpdateTableDto
    ): Promise<Table> {

        const currentUser = await this.userRepository.findOne({where: {id: userID}})

        if (!currentUser) {
            const errorObj: IErrorResponse = {
                message: "Пользователь не найден, от которого был отправлен запрос",
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
            }
            throw new NotFoundException(errorObj)

        }

        const currentTable = await this.tableRepository.findOne({where: {id: tableID}, relations: {ownUser: true}})

        if (!currentTable) {
            const errorObj: IErrorResponse = {
                message: "Таблица с данным id не найден",
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
            }
            throw new NotFoundException(errorObj)

        }

        // if (currentTable.ownUser.id !== currentUser.id) {
        //     const errorObj: IErrorResponse = {
        //         message: "Таблица с данным id не найден",
        //         status: false,
        //         statusCode: HttpStatus.NOT_FOUND,
        //     }
        // } 
        
        // ЕСЛИ МЫ ЗАХОТИМ , ЧТО БЫ РЕДАКТИРОВАТЬ МОГ ТОЛЬКО СОЗДАТЕЛЬ

        console.log(updateTableDto)

        const updateTable: Table = Object.assign({}, currentTable, updateTableDto)
        console.log(updateTable)
        return await this.tableRepository.save(updateTable)
    }

    async removeTable(userID: number, tableId: number) {

        const candidateUser = await this.userRepository.findOne({where: {id: userID}, select: {id: true}})

        if (!candidateUser) {
            const objError: IErrorResponse = {
                status: false,
                message: "Пользователь с которого был отправлен запрос не найден",
                statusCode: HttpStatus.NOT_FOUND
            } 
            throw new NotFoundException(objError)

        }

        const candidateTable = await this.tableRepository.findOne({where: {id: tableId, ownUser: {id: userID}}})

        if (!candidateTable) {
            const objError: IErrorResponse = {
                status: false,
                message: "Таблица с данным id не найдена",
                statusCode: HttpStatus.NOT_FOUND
            } 
            throw new NotFoundException(objError)
        }

        return await this.tableRepository.remove([candidateTable])

    } 

}
