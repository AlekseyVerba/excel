import { capitalize } from "../assets/pur/capitalize"
export class DomListener {
    constructor($root, listeners) {
        if (!$root) {
            throw new Error("Добавьте селектор")
        }
        this.$root = $root;
        this.$listeners = listeners;
    }



    initDomListiners() {
        if (!this.$listeners) {
            this.$listeners = []
        }
        this.$listeners.forEach(listener => {
            const method = plusOn(listener)
            if (!this[method]) {
                throw new Error(`Произошла ошибка.В компоненте ${this.name} нету метода ${method}`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListiners() {
        if (!this.$listeners) {
            this.$listeners = []
        }
        this.$listeners.forEach(removeListener => {
            console.log(removeListener)
            const method = plusOn(removeListener)
            this.$root.off(removeListener, this[method])
        })
    }
}

function plusOn(typeListener) {
    return "on" + capitalize(typeListener)
}
