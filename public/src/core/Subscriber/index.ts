import { Store } from "@core/Store"
import { IComponent } from "@core/Component/types"
import { IMainState } from "@redux/types"
import { isEqal } from "@core/utils/"

export class Subscriber {

    private sup: any = null

    constructor(private store: Store) {
        this.store = store
    }


    initSubscriber(components: IComponent[]) {

        let prevState = this.store.getState

        this.sup = this.store.subcribeState((state: IMainState): void => {
            
            components.forEach(component => {

                component.listenerState.forEach(listener => {

                    if (!isEqal(state[listener], prevState[listener])) {
                        component.stateChange(state[listener])
                    }

                })

            })

            prevState = this.store.getState

        })

    }

    stopSubscriber(): void {

        if (this.sup) {
            this.sup = null
        }

    }

}