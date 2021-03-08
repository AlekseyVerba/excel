class Dom {
    constructor(selector) {
        this.$el = typeof selector === "string"
            ? document.querySelector(selector)
            : selector
    }

    html(string) {
        if (typeof string === "string") {
            this.$el.innerHTML = string
            return this
        }
        return this.$el.innerHTML.trim();
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    on(typeListener, callback) {
        this.$el.addEventListener(typeListener, callback)
    }
    off(typeListener, callback) {
        // console.log("fff")
        // console.log(typeListener)
        this.$el.removeEventListener(typeListener, callback)
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tag, classes = "") => {
    const element = document.createElement(tag);
    if (classes) {
        element.classList.add(classes)
    }

    return $(element);
}