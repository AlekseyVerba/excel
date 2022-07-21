import { Dom, $ } from "@core/Dom"
import { Observer } from "@core/Observer"
import { SubscriberEnum } from "@/types/subscriberTypes"
import { Store } from "@core/Store/"
import { textCssToJsProperty } from "@core/utils/"
import { changeStyleAC } from "@redux/creatorsActions/toolbarCreatorAction"
import { defaultValueForButtons } from "@redux/reducers/toolbarReducer"


export class Section {
    static classNameSelected = "selected"
    observer: Observer
    currentSection: Dom
    currentSectionsArr: Dom[] = []
    store: Store

    constructor(selectorOrDomCurrentSection: string | Dom | HTMLElement, observer: Observer, store: Store) {

        if (selectorOrDomCurrentSection instanceof Dom) {
            this.currentSection = selectorOrDomCurrentSection
        } else {
            this.currentSection = $(selectorOrDomCurrentSection)
        }
        this.currentSectionsArr.push(this.currentSection)
        this.observer = observer
        this.store = store
    }

    set setCurrentSection(newSection: Dom) {
        this.currentSection = newSection
        this.currentSection.focus()
        const textCurrentSection = this.currentSection.attr("data-expression")
        let textStyles = newSection.attr("style")
        this.observer.notify(SubscriberEnum.GET_TEXT_CURRENT_SECTION, {text: textCurrentSection})

        let textStylesModify = textStyles?.replace(/(width:\s);/, "").trim()

        if (textStylesModify) {
            const styles = textCssToJsProperty(textStylesModify)
            this.store.dispatch(changeStyleAC(styles))   
        } else {
            this.store.dispatch(changeStyleAC(defaultValueForButtons))
        }

    }

    private clearArr(): void {
        this.currentSectionsArr.forEach($el => {
            $el.removeClass(Section.classNameSelected)
        })
        this.currentSectionsArr = []
    }

    chooseOneSection($el: Dom): void {
        this.clearArr()
        this.setCurrentSection = $el
        this.currentSection.addClass(Section.classNameSelected)
        this.currentSectionsArr.push($el)
        // this.currentSection
    }

    chooseGroupSections($el: Dom): void {
        this.setCurrentSection = $el
        this.currentSection.addClass(Section.classNameSelected)
        this.currentSectionsArr.push($el)
    }

}