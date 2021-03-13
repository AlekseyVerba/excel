import { $ } from "@core/dom.js"

const resize = (e, $root) => {
    if (e.target.dataset.resize) {
        let indTarget;
        let ind
        const $resizer = $(e.target);
        const $parent = $resizer.closest("[data-res]")
        const coords = $parent.getCoords();
        indTarget = e.target.parentElement;
        ind = indTarget.dataset.glavind
        let delta;


        document.onmousemove = e => {
            if ($parent.attr("data-res") === "col") {
                delta = e.pageX - coords.right
                $resizer.css({
                    "z-index": "10000",
                    "opacity": "1",
                    "height": "2000px",
                    "right": `${-delta}px`
                })


            } else if ($parent.attr("data-res") === "info") {
                delta = e.pageY - coords.bottom
                $resizer.css({
                    "z-index": "10000",
                    "opacity": "1",
                    "width": "2000px",
                    "bottom": `${-delta}px`
                })
            }
        }

        document.onmouseup = e => {


            if ($parent.attr("data-res") === "col") {
                $root.findAll(`[data-ind="${ind}"]`).forEach(item => {
                    $(item).css({
                        "width": `${delta + coords.width}px`
                    })
                })
                $parent.css({
                    "width": `${delta + coords.width}px`
                })
                $resizer.css({
                    "opacity": "0",
                    "height": "100%",
                    "right": "0"
                })
            } else if ($parent.attr("data-res") === "info") {
                $root.findAll(`[data-ind="${ind}"]`).forEach(item => {
                    $(item).css({
                        "height": `${delta + coords.height}px`
                    })
                })
                $parent.css({
                    "height": `${delta + coords.height}px`
                })
                $resizer.css({
                    "opacity": "0",
                    "width": "100%",
                    "bottom": "0"
                })
            }

            document.onmouseup = null
            document.onmousemove = null

        }
    }
}

export default resize;