import {configureStore} from "@reduxjs/toolkit"
import application from "./features/application"
import todos from "./features/todos"




export const store = configureStore({
reducer: {
  application: application,
  todos: todos
}
})










/*
export const store = createStore(
  combineReducers({
    application,
    todos,
  }),
  composeWithDevTools(applyMiddleware(thunk))
); */