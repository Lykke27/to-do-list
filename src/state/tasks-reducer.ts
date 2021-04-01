import {v1} from "uuid";
import {TaskStateType, TaskType, TodoListType} from "../App";

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

type ActionsType = RemoveTaskActionType | AddTaskActionType

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
            copyState[action.todolistId] = [newTask,...state[action.todolistId]]
            return copyState
        }

        default:
            throw new Error("WTF")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}