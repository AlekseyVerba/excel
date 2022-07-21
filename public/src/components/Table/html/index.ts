import { FiguresEnum } from "./types"
import { IMainState } from "@redux/types"
import { styleToString } from "@core/utils/"

const createColumn = (col: number, row: number, widthCol: string | undefined ,content?: string): string => {
    return `
    <div class="column" data-id="${col}:${row}" style="width: ${widthCol ? widthCol : ""}" data-column-main="${col}" data-column-id="${col}:${row}">
        <span>${content ? content : ""}</span>
        <div class="line line--column" data-column-line="column"></div>
    </div>
    `
}

const createCell = (col: number, row: number, isSelected: boolean, state: IMainState["table"]): string => {
    const id = `${col}:${row}`
    const content = state.content[id] ? state.content[id] : ""
    const colWidth = state.columnWidth[col] ? state.columnWidth[col] : ""
    // styleToString
    let styleCell: string = ""
    if (state.styleCell[id]) {
        let obj: Record<string, any> = {}
            obj[id] = JSON.parse(state.styleCell[id])
        styleCell = styleToString(Object.entries(obj)[0][1])
    }
    console.log(styleCell)

    return `
        <div class="cell ${isSelected ? 'selected' : ""}" 
        data-expression=""
        contenteditable="" 
        data-cell 
        data-column="${col}" 
        data-row="${row}" 
        data-id="${col}:${row}"
        style="width: ${colWidth}; ${styleCell}"
        >
            ${content}
        </div>
    `
}

const createRow = (column: number, state: IMainState["table"], rowNumber?: number): string => {

    const heightRowFromState = state.rowHeight[rowNumber ? rowNumber : 0]

    return `
    <div class="row" data-row-main="${rowNumber}" style="height:${heightRowFromState ? heightRowFromState : ""}">

        <div class="row-info">
            <span>${rowNumber !== undefined ? rowNumber : ""}</span>
            <div class="line line--row" data-column-line="row"></div>
        </div>

        <div class="row-data">
            ${

                rowNumber !== undefined ? 
                createManyCells(column, rowNumber, state) :
                createManyColumns(column, state["columnWidth"])
            }
        </div>


    </div>
    `
}

const createManyCells = (column: number, row: number, state: IMainState["table"]): string => {
    const firstCode = FiguresEnum.FIRST_FIGURE.charCodeAt(0)
    let template = ""
    for (let i = firstCode; i < firstCode + column; i++) {
        const isSelected = row === 1 && i === firstCode
        template += createCell(i, row, isSelected, state)
    }
    return template
}

const createManyColumns = (column: number, state: IMainState["table"]["columnWidth"]): string => {
    const firstCode = FiguresEnum.FIRST_FIGURE.charCodeAt(0)
    let template = ""
    for (let i = firstCode; i < firstCode + column; i++) {
        const widthCol = state[i]
        template += createColumn(i, 0, widthCol, String.fromCharCode(i))
    }
    return template
}


export const createTable = (countRow: number, loading: boolean, state: IMainState["table"]): string => {
    const firstCodeFigure = FiguresEnum.FIRST_FIGURE.charCodeAt(0)
    const lastCodeFigure = FiguresEnum.LAST_FIGURE.charCodeAt(0)
    const differenceCodes = lastCodeFigure - firstCodeFigure + 1

    const firstRow = createRow(differenceCodes, state)

    let rowsCells = ""

    for (let i = 0; i < countRow; i++) {

        rowsCells += createRow(differenceCodes,state, i + 1)

    }

    return `<div style="display: ${loading ? 'none' : 'block'}">${firstRow + rowsCells}</div>`
}