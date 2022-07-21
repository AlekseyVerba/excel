export const createTemplate = (name: string): string => {
    return `

    <input type="text" class="input" value="${name}" />

    <div>

    <div class="button" data-delete>
        <i class="material-icons">delete</i>
    </div>

    <a href="${window.location.origin}/#dashboard" class="button">
        <i class="material-icons">exit_to_app</i>
    </a>

    </div>

`
}