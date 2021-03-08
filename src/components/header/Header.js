import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root) {
    super($root, {
      name: "Header",
      listeners: ["click"]
    })
  }
  toHTML() {
    const element = `
            
      <input type="text" class="input" value="Новая таблица" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>

        `
    return element;
  }
  onClick(event) {
    console.log(event.target)
  }
}
