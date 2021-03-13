import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from "./table.template";
import resize from "./resize";
import { $ } from "@core/dom.js"
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root) {
    super($root, {
      listeners: ["mousedown"]
    });
  }
  toHTML() {
    return createTable(20);
  }

  onMousedown(e) {
    resize(e, this.$root)
  }







}
