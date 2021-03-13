const CODES = {
    A: 65,
    Z: 90
}

function createCol(char, ind) {
    return `
        <div class="column" data-res="col" data-glavind=${ind}>
            ${char}
            <div class="col-line" data-resize='col'></div>
        </div>
    `
}

function createCell(ind) {
    return `
        <div class="cell" data-ind=${ind} contenteditable style="position: relative"></div>
    `
}

function createRow(content, index = "") {
    return ` 
    <div class="row" data-res='info'>

        <div class="row-info">
            ${index}
            ${index ? "<div class='row-line' data-resize='row'></div>" : ""}
        </div>

        <div class="row-data">${content}</div>

    </div>
    
    `
}

export function createTable(rowsCount = 15) {
    const char = CODES.Z - CODES.A + 1
    const columns = []
    const counts = []
    for (let i = 0; i < char; i++) {
        counts.push(CODES.A + i)
        columns.push(createCol(String.fromCharCode(CODES.A + i), counts[i]))
    }

    const cells = []

    for (let i = 0; i < char; i++) {
        cells.push(createCell(counts[i]))
    }

    const rows = []
    rows.push(createRow(columns.join("")))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells.join(""), i + 1));
    }

    return rows.join("")
}