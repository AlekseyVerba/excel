export interface IDomListeners {
    initListeners(): void
    destroyListeners(): void
}



export interface IDomOptions {
    listeners: string[]
}
