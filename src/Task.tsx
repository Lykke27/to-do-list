import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

const Task = React.memo((props: TaskPropsType) => {
    const removeTask = useCallback( () => {
        props.removeTask(props.task.id, props.todoListID)
    },[])
    const changeTaskStatus = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    },[])
    const changeTaskTitle = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListID)
    },[])

    return (
        <div className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton
                onClick={removeTask}
            >
                <Delete/>
            </IconButton>
        </div>
    )
})

export default Task;