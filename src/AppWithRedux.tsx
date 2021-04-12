import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "../src/state/tlReducer"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"  //чтобы не опечататься
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL
    // const todoListID_1 = v1()
    // const todoListID_2 = v1()
    // const [todoLists, dispatchTodoLists] = useReducer(todolistReducer,[
    //     {id: todoListID_1, title: "What to learn", filter: "all"},
    //     {id: todoListID_2, title: "What to buy", filter: "all"},
    // ])
    // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
    //     [todoListID_1]: [
    //         {id: v1(), title: "JS", isDone: false},
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: false},
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Milk", isDone: false},
    //         {id: v1(), title: "Bread", isDone: false},
    //     ],
    // })

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()

    //TASKS
    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }

    //TO DO LISTS
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let action = ChangeTodoListFilterAC(newFilterValue, todoListID)
        dispatch(action)
    }

    function changeTodolistTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(newTitle, todoListID)
        dispatch(action)
    }

    //UI
    // Create Read Update Delete
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}} elevation={10}>
                    <TodoList todoListID={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              addTask={addTask}
                              filter={tl.filter}
                              changeFilter={changeFilter}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              removeTask={removeTask}
                              removeTodoList={removeTodoList}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        To-do list App
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "15px 0px"}}>
                    <Paper style={{padding: "10px"}} elevation={10}>
                        <AddItemForm addItem={addTodoList} helperText={"Add new list title"}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
