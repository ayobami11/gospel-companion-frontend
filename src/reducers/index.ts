import { Actions, ActionTypes } from "@/actions";

import type { MessageFormProps } from "@/actions";

export interface State {
    isHamburgerMenuOpen: boolean,
    messageForm: MessageFormProps
};


export interface AppContextType {
    state: State,
    dispatch: React.Dispatch<Actions>
};

export const reducer = (state: State, action: Actions) => {

    switch (action.type) {
        case ActionTypes.OPEN_HAMBURGER_MENU: {
            return {
                ...state,
                isHamburgerMenuOpen: true
            }
        }

        case ActionTypes.CLOSE_HAMBURGER_MENU: {
            return {
                ...state,
                isHamburgerMenuOpen: false
            }
        }

        case ActionTypes.UPDATE_MESSAGE_FORM: {

            return {
                ...state,
                messageForm: {
                    ...state.messageForm,
                    [action.payload.name]: action.payload.value
                }
            }
        }


        default: {
            return state;
        }
    }
}

export const initialState: State = {
    isHamburgerMenuOpen: false,
    messageForm: {
        level: "ONE",
        course: "",
        message: ""
    }
}