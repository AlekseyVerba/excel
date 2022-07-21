import { Dom } from "@core/Dom"
import { requestPostOrPut } from "@/requests"
import { EnumRequestPost } from "@/requests/requestEnum"
import { ISuccessResponse, IErrorResponse } from "@/types/responses/"
import { ITable } from "@/types/table"
import { RouterPath } from "@core/RouterPath"

export const createTable = async ($target: Dom): Promise<void> => {
    const id = $target.dataset.create
    
    const res = await requestPostOrPut<ISuccessResponse<ITable> | IErrorResponse, {}>(
        {
            url: `${EnumRequestPost.CREATE_TABLE}/${id}`,
             body: {}, auth: true, method: "POST"
        }
    )

    if (res) RouterPath.changeHash(`excel/${id}`)
    
}