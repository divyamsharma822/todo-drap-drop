import { Todo, Actions } from "../model";

export const CompletedTodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
        case "add": {
            let newState = [...state, { id: Date.now(), todo: action.payload, isDone: false }];
            window.localStorage.setItem("completedtodos", JSON.stringify(newState));
            return newState;
        }
        case "remove": {
            let newState = state.filter((todo) => todo.id !== action.payload);
            window.localStorage.setItem("completedtodos", JSON.stringify(newState));
            return newState;
        }
        case "done": {
            let newState = state.map((todo) => (todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo));
            window.localStorage.setItem("completedtodos", JSON.stringify(newState));
            return newState;
        }
        case "edit": {
            let newState = state.map((todo) => (todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo));
            window.localStorage.setItem("completedtodos", JSON.stringify(newState));
            return newState;
        }
        case "replace": {
            let newState = action.payload;
            window.localStorage.setItem("completedtodos", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
};
