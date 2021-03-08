import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = "excel__formula";
    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click"],
        });

    }
    toHTML() {
        const element = `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
        `
        return element;
    }
    onInput(event) {
        console.log(event)
    }
    onClick() {
        console.log("Привет")
    }
}
