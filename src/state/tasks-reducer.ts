import {v1} from "uuid";
import {TaskStateType, TaskType} from "../App";
import {AddTodoListActionType} from "./tl-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string
}

type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type changeTaskStatusActionType = {
    id: string
    type: "CHANGE-STATUS"
    todolistId: string
    isDone: boolean
}
type changeTaskTitleActionType = {
    id: string
    type: "CHANGE-TITLE"
    todolistId: string
    title: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }

        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let copyState = {...state}
            copyState[action.todolistId] = [newTask, ...state[action.todolistId]]
            return copyState
        }

        case "CHANGE-STATUS": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.id) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-STATUS", id, todolistId, isDone}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE", id, todolistId, title}
}