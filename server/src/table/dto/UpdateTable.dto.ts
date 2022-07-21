import { IUpdateTable } from "../types/updateTable.interface"
import { IsJSON, IsString, IsOptional } from "class-validator"

const messageForJsonType = "Должно быть строкой"

export class UpdateTableDto implements IUpdateTable {
    @IsString({
        message: "Должно быть строкой",

    })
    @IsOptional()
    name?: string;
    @IsOptional()
    content?: string;
    // @IsString({
    //     message: messageForJsonType
    // })
    @IsOptional()
    columnWidth?: string;
    // @IsString({
    //     message: messageForJsonType
    // })
    @IsOptional()
    rowHeight?: string;
    // @IsString({
    //     message: messageForJsonType
    // })
    @IsOptional()
    styleCell?: string;
}