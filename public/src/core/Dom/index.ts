import { Properties } from "csstype"

export class Dom {
    $el: HTMLElement
    constructor($el: HTMLElement | string) {
        
        if (typeof $el === "string") {
            const $domEL = document.querySelector($el) as HTMLElement

            if ($domEL === null) {
                throw new Error(`Элемент с селектором "${$el} не найден"`)
            }

            this.$el = $domEL
        } else {
            this.$el = $el
        }

    }

    addClass(classOrClasses: string | string[]): this {
        if (typeof classOrClasses === "string") {
            this.$el.classList.add(classOrClasses)
        } else {
            classOrClasses.forEach(className => {
                this.$el.classList.add(className)
            })
        }

        return this
    }

    click(): void {
        this.$el.click()
    }

    removeClass(classOrClasses: string | string[]): this {

        if (typeof classOrClasses === "string") {
            this.$el.classList.remove(classOrClasses)
        } else {
            classOrClasses.forEach(className => {
                this.$el.classList.remove(className)
            })
        }

        return this

    }

    addStyle(styles: Properties): this {
        for(let i in styles) {
            this.$el.style[i as any] = (styles as any)[i]
        }
        return this
    }

    parent(): Dom {
        return $(this.$el.parentElement as HTMLElement)
    }

    next(): Dom | undefined {
        const $el = this.$el.nextElementSibling
        if (!$el) return undefined
        return $($el as HTMLElement)
    }

    find(selector: string): Dom | undefined {
        const $el = this.$el.querySelector(selector)
        if (!$el) return undefined
        return $($el as HTMLElement)
    }

    html(): string
    html(content: string): this
    html(content?: string): string | this {
        if (typeof content !== "undefined") {
            this.$el.innerHTML = content
            return this
        } 

        return this.$el.innerHTML
    }

    attr(nameAttr: string): string | null
    attr(nameAttr: string, value: string): this
    attr(nameAttr: string, value?: string): this | string | null {
        
        if (value) {
            this.$el.setAttribute(nameAttr, value)
            return this
        }

        return this.$el.getAttribute(nameAttr)
    }

    append(el: Dom | Node | string): this {
        
        if (el instanceof Dom) {
            this.$el.append(el.$el)
        } else {
            this.$el.append(el)
        }

        return this
    }

    on(methodName: string, callBack: () => {}): void {
        this.$el.addEventListener(methodName, callBack)
    }

    get dataset(): DOMStringMap {
        return this.$el.dataset
    }

    get offsetLeft(): number {
        return this.$el.offsetLeft
    }

    get getRect(): DOMRect {
        return this.$el.getBoundingClientRect()
    }

    getStyle<T extends keyof CSSStyleDeclaration>(property: T): any {
        return window.getComputedStyle(this.$el)[property]
    }
    

    closest(selector: string): Dom | undefined {
        const parentEl = this.$el.closest(selector)

        if (!parentEl) return undefined

        return $(parentEl as HTMLElement)
    }

    contains(className: string): boolean {
        return this.$el.classList.contains(className)
    }

    clear(): this {
        this.html("")
        return this
    }

    focus(): this {
        this.$el.focus()
        return this
    }

    text(): string | null
    text(content: string): this
    text(content?: string): string | null | this {
        if (content !== undefined) {
            this.$el.textContent = content
            return this
        }

        return this.$el.textContent
    }

    destroyListener(methodName: string, callBack: () => {}): void {
        this.$el.removeEventListener(methodName, callBack)
    }

    get value(): string | undefined {
        if (this.$el.tagName === "input") {
            const $el = this.$el as HTMLInputElement
            return $el.value
        }
    }
  
}

export const $ = (el: string | HTMLElement): Dom => {
    return new Dom(el)
}

$.create = <TAG extends keyof HTMLElementTagNameMap>(tag: TAG): Dom => {
    return $(document.createElement(tag))
}
