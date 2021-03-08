const CODES = {
    A: 65,
    Z: 90
}

function createCol(char) {
    return `
        <div class="column">${char}</div>
    `
}

function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createRow(content, index = "") {
    return ` 
    <div class="row">

        <div class="row-info">${index}</div>

        <div class="row-data">${content}</div>

    </div>
    
    `
}

export function createTable(rowsCount = 15) {
    const char = CODES.Z - CODES.A + 1
    const columns = []
    for (let i = 0; i < char; i++) {
        columns.push(createCol(String.fromCharCode(CODES.A + i)))
    }

    const cells = []

    for (let i = 0; i < char; i++) {
        cells.push(createCell())
    }

    const rows = []
    rows.push(createRow(columns.join("")))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells.join(""), i + 1));
    }

    return rows.join("")
}