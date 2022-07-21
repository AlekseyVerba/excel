export class RouterPath {

    static get currentPath(): string {
        return window.location.hash.slice(1)
    }
    

    static get getCurrentPage(): string {
        return this.currentPath.split("/")[0]
    }

    static get getGET(): string {
        return this.currentPath.split("?")[1]
    }


    static get originURL(): string {
        return window.location.protocol + '//' + window.location.host
    }

    static createURLWithCurrentOrigin(url: string): string {
        return this.originURL + url
    }

    static changeHash(hash: string): void {
        location.hash = hash
    }
}

