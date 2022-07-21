import { IButton } from "./type"
import { IMainState } from "@redux/types"

export const createHTML = ({toolbar: {value}}: IMainState): string => {
    // debugger
    const buttons: IButton[] = [
        {
            active: value.textAlign === "left" ? true : false,
            name: "format_align_left",
            value: {
                textAlign: "left"
            }
        },
        {
            name: "format_align_center",
            active: value.textAlign === "center" ? true : false,
            value: {
                textAlign: "center"
            }
        },
        {
            name: "format_align_right",
            active: value.textAlign === "right" ? true : false,
            value: {
                textAlign: "right"
            }
        },
        {
            name: "format_bold",
            active: value.fontWeight === "bold" ? true : false,
            value: {
                fontWeight: value.fontWeight === "bold" ? "normal" : "bold"
            }
        },
        {
            name: "format_italic",
            active: value.fontStyle === "italic" ? true : false,
            value: {
                fontStyle: value.fontStyle === "italic" ? "normal" : "italic"
            }
        },
        {
            name: "format_underlined", 
            active: value.textDecoration === "underline" ? true : false,
            value: {
                textDecoration: value.textDecoration === "underline" ? "none" : "underline"
            }
        }
    ]

    return buttons.map(createButton).join("")
}

const styleToJson = (styles: IButton["value"]): string => {
    return JSON.stringify(styles)
}

const createButton = (button: IButton): string => {
    const styleJson = styleToJson(button.value)

    return `
    <div data-style='${styleJson}' class="button ${button.active ? "active" : ""}">
        <i class="material-icons">${button.name}</i>
    </div>
    `
}