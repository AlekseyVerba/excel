export class Observer {

    private observers: Record<string, ((...args: any) => any)>

    constructor() {
        this.observers = {}
    }

    subscribe(type: string, fn: (...args: any) => any): void {
        this.observers[type] = fn
    }

    unsubscribe(): void {
        this.observers = {}
    }
    


    notify(type: string ,data: Record<string, any>): void {
        
        if (this.observers[type]) {
            this.observers[type](data)
        }
        
    }


}