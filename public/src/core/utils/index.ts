import { Dom } from "@core/Dom"
import { Properties } from "csstype"
import { ICompareCells } from "./type"


export const addOnToString = (str: string): string => {
    return "on" + str[0].toUpperCase() + str.slice(1)
}

export const isResize = (dataAttrs: object): boolean => dataAttrs.hasOwnProperty("columnLine")
export const isCell = ($target: Dom): boolean => $target.closest("[data-cell]") !== undefined

export const compareCells = ($firstEl: Dom, $secondEl: Dom): ICompareCells => {

    const firstColumnID = $firstEl.dataset.column!
    const firstRowID = $firstEl.dataset.row!
    
    const secondColumnID = $secondEl.dataset.column!
    const secondRowID = $secondEl.dataset.row!


    if (firstColumnID > secondColumnID) {
        return {
            more: $firstEl,
            less: $secondEl
        }
    } else if (secondColumnID > firstColumnID) {
        return {
            more: $secondEl,
            less: $firstEl
        }
    }

    if (firstRowID > secondRowID) {
        return {
            more: $firstEl,
            less: $secondEl
        }
    } else if (secondRowID > firstRowID) {
        return {
            more: $secondEl,
            less: $firstEl
        }
    }

    return {
        more: $secondEl,
        less: $firstEl
    }
    
}

export const isExpression = (str: string): boolean => {
    return str[0] === "="
}

export const isEqal = (firstObj: Record<string, any> | string, secondObj: Record<string, any> | string): boolean => {

    if (typeof firstObj === "object" && typeof secondObj === "object") {

        if (JSON.stringify(firstObj) === JSON.stringify(secondObj)) {
            return true
        }

    } else if (typeof firstObj === "string" && typeof secondObj === "string") {
        if (firstObj === secondObj) {
            return true
        }
    }

    return false

}


export const styleToString = (styles: any) => {

    return Object.keys(styles).reduce((acc, key: any) => (
         acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + styles[key] + ';'
         
    ), '');
};


export const textCssToJsProperty = (str: string): Properties => {
    let styles: any = {}

    str.split(";").filter(el => el.length > 1).map(el => el.split(":")).map(el => el.map((elTwo, i) => {
        if (elTwo.indexOf("-") && i === 0) {
            const ind = elTwo.indexOf("-")
            const newChar = elTwo[ind + 1].toUpperCase()
            let newName = elTwo.slice(0, ind) + newChar + elTwo.slice(ind + 2)
            return newName.trim()
        }
        return elTwo.trim()
    })).forEach(arrStyle => styles[arrStyle[0]] = arrStyle[1])

    styles as Properties
    return styles

}


export const debounce = (fn: any, wait: number) => {
    let timeout: any
    return function(...args: any[]) {
        const later = () => {
            clearInterval(timeout)
            fn(...args)
        }

        clearInterval(timeout)
        timeout = setTimeout(later, wait)
    }
}