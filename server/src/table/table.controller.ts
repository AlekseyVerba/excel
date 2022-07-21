import { Controller, Post, UseGuards, Body, Get, Put, Param, ParseIntPipe, Delete } from "@nestjs/common"
import { TableService } from "./table.service"
import { Table } from "./table.entity"
import { AuthGuard } from "../guards/auth.guard"
import { UpdateTableDto } from "./dto/UpdateTable.dto"
import { ValidationPipe } from "../pipes/validation.pipe"
import { User } from "../decorators/user.decorator"
import { UserProperty } from "../decorators/userProperty.decorator"
import { IUserForToken } from "../user/types/"
import { ISuccessResponse } from "../types/response.interface"

@Controller("table")
export class TableController {
    
    constructor(
        
        private tableService: TableService
    ) {}

    @Post("create/:id")
    @UseGuards(AuthGuard)
    async createTable(
        @User() user: IUserForToken,
        @Param("id") tableID: string
    ): Promise<Table> {
        return await this.tableService.createTable(user, tableID)
    } 


    @Put(":id")
    @UseGuards(AuthGuard)
    async updateTable(
        @Body(new ValidationPipe()) updateTableDto: UpdateTableDto,
        @UserProperty("id") userID: number,
        @Param("id", ParseIntPipe) tableID: number
    ): Promise<Table> {
        console.log(updateTableDto)
        return await this.tableService.updateTable(tableID, userID, updateTableDto)
    }

    @Get(":linkID")
    @UseGuards(AuthGuard)
    async getTable(
        @UserProperty("id") userID: number,
        @Param("linkID") linkID: string
    ): Promise<ISuccessResponse<Table>> {
        const table =  await this.tableService.getTableByLink(userID, linkID)
        return {
            status: true,
            message: "Таблица получена",
            data: table
        }
    }    

    @Get()
    @UseGuards(AuthGuard)
    async getMyTables(
        @UserProperty("id") userID: number
    ): Promise<Table[]> {
        const tables = await this.tableService.getTablesByIdUser(userID)
        return tables
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteTable(
        @UserProperty("id") userID: number,
        @Param("id", ParseIntPipe) tableId: number
    ): Promise<ISuccessResponse<Table[]>> {
        const res = await this.tableService.removeTable(userID, tableId)
        return {
            status: true,
            message: "Таблица удалена",
            data: res
        }
    }
}