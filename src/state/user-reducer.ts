import {v1} from "uuid";
import {FilterValuesType, TaskType, TodoListType} from "../App";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
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

export const todolistReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolistID = v1()
            const newTodoList: TodoListType = {
                id: newTodolistID,
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