import {tasksReducer} from './tasks-reducer';
import {combineReducers, createStore} from 'redux';
import {todolistReducer} from "./tlReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer);

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;