import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

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

const TodoList = React.memo((props: TodoListPropsType) => {
    //добавить пропсы деструктуризацией
    console.log("To do list")
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.todoListID, props.addTask])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todoListID),[])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todoListID), [props.changeTodolistTitle, props.todoListID])

    const setAllFilter = useCallback(() => {
        props.changeFilter("all", props.todoListID)
    }, [props.todoListID])
    const setActiveFilter = useCallback(() => {
        props.changeFilter("active", props.todoListID)
    }, [props.todoListID])
    const setCompletedFilter = useCallback(() => {
        props.changeFilter("completed", props.todoListID)
    }, [props.todoListID])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    const tasks = tasksForTodolist.map(t =>

        <Task
        key={t.id}
        task={t}
        changeTaskTitle={props.changeTaskTitle}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        todoListID={props.todoListID}
    />)


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
})

export default TodoList;