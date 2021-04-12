import {v1} from "uuid";
import {FilterValuesType, TaskStateType, TodoListType} from "../App";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

let initialState: Array<TodoListType> = []

export const todolistReducer = (todoLists = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        default:
            return todoLists
    }
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string,): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
