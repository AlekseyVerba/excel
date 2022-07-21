import { HttpStatus } from "@nestjs/common"

export interface ISuccessResponse<DATA>{
    status: boolean
    message: string
    data: DATA
}

export interface IErrorResponse{
    status: false
    statusCode: HttpStatus
    message: string
    errors?: any
}