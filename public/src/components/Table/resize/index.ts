import { $, Dom } from "@core/Dom"
import { IInfoAboutTarget } from "./type"
import { Store } from "@core/Store"
import { changeInfoAC } from "@redux/creatorsActions/tableCreatorActions"
import { TableTypeActions } from "@/redux/reducers/tableReducer/type"

const getInfoAboutColumn = ($target: Dom): IInfoAboutTarget => {
    const $currentEl = $target.closest(".column") as Dom
    const currentWidthOrHeightElement: number = parseInt($currentEl.getStyle("width"))
    const currentElementXOrY: number = $currentEl.getRect.x + currentWidthOrHeightElement
    const currentColumnOrRowID = $currentEl.dataset.columnMain!

    return {
        $currentEl,
        currentWidthOrHeightElement,
        currentElementXOrY,
        currentColumnOrRowID
    }

}

const getInfoAboutRow = ($target: Dom): IInfoAboutTarget => {
    const $currentEl = $target.closest(".row") as Dom
    const currentWidthOrHeightElement: number = parseInt($currentEl.getStyle("height"))
    const currentElementXOrY: number = $currentEl.getRect.y + currentWidthOrHeightElement
    const currentColumnOrRowID = $currentEl.dataset.rowMain!

    return {
        $currentEl,
        currentWidthOrHeightElement,
        currentElementXOrY,
        currentColumnOrRowID
    }

}


export const startResize = ($target: Dom, typeResize: "column" | "row", store: Store): void => {

    const { $currentEl, currentColumnOrRowID,
            currentElementXOrY, currentWidthOrHeightElement } = typeResize === "column" ? 
                                                                getInfoAboutColumn($target) : 
                                                                getInfoAboutRow($target)

    $target.addClass(`line--${typeResize}--active`)

    document.onmousemove = (event: MouseEvent) => {
        const additionalWidthOrHeight = typeResize === "column" ? 
                                        event.x - currentElementXOrY : 
                                        event.y - currentElementXOrY
        $currentEl.addStyle({
            [typeResize === "column" ? "width" : "height"]: `${currentWidthOrHeightElement + additionalWidthOrHeight}px`
        })
    }


    document.onmouseup = () => {

        $target.removeClass(`line--${typeResize}--active`)

        const updateWidth = $currentEl.getStyle("width")

        if (typeResize === "column") {
            document.querySelectorAll(`[data-column="${currentColumnOrRowID}"]`).forEach(el => {
                const $el = $(el as HTMLElement)
                $el.addStyle({width: updateWidth})
            })

            store.dispatch({type: TableTypeActions.CHANGE_COLUMN_WITDH, payload: {id: currentColumnOrRowID, value: updateWidth}})

        } else {
            const updateHeight = $currentEl.getStyle("height")
            store.dispatch({type: TableTypeActions.CHANGE_ROW_HEIGHT, payload: {id: currentColumnOrRowID, value: updateHeight}})
        }

        document.onmousemove = null
        document.onmouseup = null
    }

}

