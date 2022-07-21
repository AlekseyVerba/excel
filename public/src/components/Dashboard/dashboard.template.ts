import { v4 } from "uuid"
import { templateLoader } from "@/templates/loader"
import { ITable } from "@/types/table"
import { IStateDashboard, ICreateNewUrlForTable } from "./type"
import { RouterPath } from "@core/RouterPath"

export const createTemplate = ({ loading, tables }: IStateDashboard): string => {
  
    const tablesIndicator = loading ? templateLoader() : templateTables(tables)

    const {id, url} = urlForNewTable()

    return `
        <div class="db__header">
          <h1>Мои таблицы</h1>
        </div>
  
        <div class="db__new">
          <div class="db__view">
            <a href="${url}"  data-create="${id}" class="db__create">
              Новая <br /> Таблица
            </a>
          </div>
        </div>
  
        ${tablesIndicator}

        `
}

export const templateTables = (tables: ITable[]): string => {

    if (tables.length === 0) return tableMessageNoTables()
    return templateWithTables(tables)

}


export const tableMessageNoTables = (): string => {
  return `
    <h3>Таблиц ещё не создано</h3>
  `
}

export const templateWithTables = (tables: ITable[]): string => {

  const strTables = tablesArrToStr(tables)

  return `
    <div class="db__table db__view">

      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">

      ${strTables}

      </ul>

    </div>
  `
}

export const tablesArrToStr = (tables: ITable[]): string => {
  return tables.map(templateTable).join("")
}

export const templateTable = ({name, updateAt, link}: ITable): string => {

  const linkTable = RouterPath.createURLWithCurrentOrigin(`#excel/${link}`)

  return `
  <li class="db__record">
    <a href="${linkTable}">${name}</a>
    <strong>${new Date(updateAt)}</strong>
  </li>
  `
}

const urlForNewTable = (): ICreateNewUrlForTable => {
    const id = v4()
    const url = RouterPath.createURLWithCurrentOrigin(`#excel/${id}`)
    return {
      id, 
      url
    }
}