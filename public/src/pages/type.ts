import { Dom } from "@core/Dom"

export interface IPage {
    getRoot(): Dom
    init(): void
    afterRendering(): void
    destroy(): void
}