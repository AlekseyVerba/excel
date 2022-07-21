import { Section } from "../Section/"
import { Dom, $ } from "@core/Dom"
import { compareCells } from "@core/utils/"
import { KeysArrow } from "../type"

export const changeSection = (section: Section, $target: Dom, event: MouseEvent): void => {

    const isKeyTouched = event.ctrlKey || event.altKey || event.shiftKey
    
    if(!isKeyTouched) {
        section.chooseOneSection($target)
    } else if (event.altKey) {
        algortmWithAltKey(section, $target)
    } else if (event.shiftKey) {
        algoritmWithShiftKey(section, $target)
    } else {
        section.chooseGroupSections($target)
    }

}

export const changeSectionWithKey = (section: Section, event: KeyboardEvent): void => {

    const targetColumnID: number = +section.currentSection.dataset.column!
    const targetRowID: number = +section.currentSection.dataset.row!


    let nextSection: Dom | undefined

    switch(event.key) {

        case KeysArrow.TOP: {
            nextSection = $(`[data-column="${targetColumnID}"][data-row="${targetRowID - 1}"]`)
            break
        }

        case KeysArrow.LEFT: {
            nextSection = $(`[data-column="${targetColumnID - 1}"][data-row="${targetRowID}"]`)
            break
        }

        case KeysArrow.ENTER:
            if(!event.shiftKey) {
                event.preventDefault()
            } else {
                break
            }
        case KeysArrow.DOWN: {
            nextSection = $(`[data-column="${targetColumnID}"][data-row="${targetRowID + 1}"]`)
            break
        }

        case KeysArrow.RIGHT: {
            nextSection = $(`[data-column="${targetColumnID + 1}"][data-row="${targetRowID}"]`)
            break
        }

        default: {
            break
        }
    }

    if (nextSection) {
        section.chooseOneSection(nextSection)
    }

}


const algortmWithAltKey = (section: Section, $lastEl: Dom): void => {

    const { less, more } = compareCells(section.currentSection, $lastEl)
    $lastEl = more

    let $currentEl = less
    section.chooseGroupSections($currentEl)

    while($currentEl.dataset.id !== $lastEl.dataset.id!) {

        let newEl = $currentEl.next()

        if (!newEl) {
            newEl = $currentEl.parent().parent().next()!.find(".cell")
        }

        
        $currentEl = newEl!
        section.chooseGroupSections($currentEl)
    }

}

const algoritmWithShiftKey = (section: Section, $lastEl: Dom): void => {


    
    const { less, more } = compareCells(section.currentSection, $lastEl)
    $lastEl = more
    const $startEl = less

    let $currentEl = less
    section.chooseGroupSections($currentEl)
    while ($currentEl.dataset.id !== $lastEl.dataset.id!) {
        let newEl: Dom | undefined = undefined

        if ($currentEl.dataset.column! < $lastEl.dataset.column!) {
            let el = document.querySelector(`[data-column="${+$currentEl.dataset.column! + 1}"][data-row="${$currentEl.dataset.row}"]`)
            if (el) newEl = $(el as HTMLElement)
        }

        if (!newEl!) {
            let el = document.querySelector(`[data-column="${$startEl.dataset.column!}"][data-row="${+$currentEl.dataset.row! + 1}"]`)
            if (el) newEl = $(el as HTMLElement)
        }
        $currentEl = newEl!
        section.chooseGroupSections($currentEl)

    }
}