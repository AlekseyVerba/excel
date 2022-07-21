import { Dom } from "@/core/Dom";

export interface IInfoAboutTarget {
    $currentEl: Dom
    currentWidthOrHeightElement: number
    currentElementXOrY: number
    currentColumnOrRowID: string
}