import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void // когда у функции нет ретурна
    removeTask: (taskID: string, todoListID: string) => void // описываем тип функции
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => {
        props.changeFilter("all", props.todoListID)
    }
    const setActiveFilter = () => {
        props.changeFilter("active", props.todoListID)
    }
    const setCompletedFilter = () => {
        props.changeFilter("completed", props.todoListID)
    }
    const changeTodoListTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }

        return (
            <div className={t.isDone ? "is-done" : ""} key={t.id}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton
                    onClick={removeTask}
                >
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    return (
        <div>
            <h3 style={{margin: "5px"}}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} helperText={"Add new task title"}/>
            <div>
                {tasks}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={setAllFilter}>
                    All
                </Button>

                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={setActiveFilter}>
                    Active
                </Button>

                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={setCompletedFilter}>
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;