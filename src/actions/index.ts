export interface MessageFormProps {
    level: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE",
    course: string,
    message: string
}

export enum ActionTypes {
    UPDATE_MESSAGE_FORM = "UPDATE_MESSAGE_FORM",
    OPEN_HAMBURGER_MENU = "OPEN_HAMBURGER_MENU",
    CLOSE_HAMBURGER_MENU = "CLOSE_HAMBURGER_MENU"
}

export type OpenHamburgerMenuAction = {
    type: ActionTypes.OPEN_HAMBURGER_MENU
}

export type CloseHamburgerMenuAction = {
    type: ActionTypes.CLOSE_HAMBURGER_MENU
}

export type UpdateMessageFormAction = {
    type: ActionTypes.UPDATE_MESSAGE_FORM,
    payload: {
        name: "level" | "course" | "message",
        value: string
    }
}

export type Actions = UpdateMessageFormAction | OpenHamburgerMenuAction | CloseHamburgerMenuAction;