import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"  //чтобы не опечататься

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks}) //перерисовка если есть изменения
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        //false -> undefined, null, 0, '', NaN
        //true -> {}, []
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks}) //складываем таски в объект
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks}) //складываем таски в объект
        }
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodolistTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodolist: TodoListType = {
            id: newTodoListID,
            title, // то же самое что title: title
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodoListID]: []})
    }

    //UI
    //Create Read Update Delete
    const todoListComponents = todoLists.map(tl => {

        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
        }

        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
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
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>

    );
}

export default App;
