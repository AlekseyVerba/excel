import { Dom } from "@core/Dom"

export const isButtonCreate = ($target: Dom): boolean => {
    return typeof $target.closest("[data-create]") !== "undefined"
}