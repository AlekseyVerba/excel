import { $, Dom } from "@/core/Dom"
import { TypeComponents } from "./types"
import { IComponent } from "@core/Component/types"
import { Observer } from "@core/Observer"
import { Store } from "@/core/Store"
import { Subscriber } from "@core/Subscriber"
import { observer, store } from "@/index"

export class Excel {
    private components: TypeComponents = []
    private initComponents: IComponent[] = []
    private $root!: Dom
    private subscriber!: Subscriber
    store: Store
    observer: Observer 

    constructor(components: TypeComponents, rootSelector: string) {
        this.components = components
        this.$root = $.create("div").addClass(rootSelector)
        this.store = store
        this.observer = observer
        this.subscriber = new Subscriber(this.store)
    }

    


    getRoot(): Dom {

        this.initComponents = this.components.map((Component) => {

            const $root = $.create("div").addClass(Component.classComponent)

            const newComponent = new Component($root)
            $root.html(newComponent.toHTML())
            this.$root.append($root)
            return newComponent
        })  
        return this.$root

    }

    init(): void {
        this.initComponents.forEach(component => component.init())
        this.subscriber.initSubscriber(this.initComponents)
    }

    destroy(): void {
        this.initComponents.forEach(component => component.destroy())
        this.observer.unsubscribe()
    }

}