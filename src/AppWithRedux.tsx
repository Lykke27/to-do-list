import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {AddTodolistAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../src/state/tlReducer"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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
    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    //TASKS
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    },[dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    } ,[dispatch])

    //TO DO LISTS
    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    },[dispatch])
    const removeTodoList =useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    },[dispatch])
    const changeFilter=useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        let action = ChangeTodoListFilterAC(newFilterValue, todoListID)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todoListID: string) => {
        let action = ChangeTodoListTitleAC(newTitle, todoListID)
        dispatch(action)
    },[dispatch])

    //UI
    // Create Read Update Delete
    const todoListComponents = todoLists.map(tl => {


        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}} elevation={10}>
                    <TodoList todoListID={tl.id}
                              title={tl.title}
                              tasks={tasks[tl.id]}
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
