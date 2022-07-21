export interface ITable { 
    id: number
    name: string
    content: Record<string, any>
    columnWidth: Record<string, any>
    rowHeight: Record<string, any>
    styleCell: Record<string, any>
    link: string
    ownUser: number
    updateAt: Date
    createAt: Date
}