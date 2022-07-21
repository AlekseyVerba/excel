
interface IResponse {
    status: boolean
    message: string
}

export interface ISuccessResponse<DATA extends Record<any, any>> extends IResponse {
    data: DATA
    status: true
}

export interface IErrorResponse extends IResponse{
    status: false
    statusCode: number
    errors?: any
}