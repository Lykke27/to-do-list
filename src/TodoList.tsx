import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";

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
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title:string) => props.addTask(title, props.todoListID)


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

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}> X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active" : ""}
                        onClick={setAllFilter}>
                    All
                </button>

                <button className={props.filter === "active" ? "active" : ""}
                        onClick={setActiveFilter}>
                    Active
                </button>

                <button className={props.filter === "completed" ? "active" : ""}
                        onClick={setCompletedFilter}>
                    Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;