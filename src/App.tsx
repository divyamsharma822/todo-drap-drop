import React, { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { TodoReducer } from "./todoSlice";

const App: React.FC = () => {
    const [state,dispatch] = useReducer(TodoReducer,[]);
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>(state);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            dispatch({type: "add", payload: todo});
            setTodo("");
        }
    };

    return (
        <div className='app flex flex-col items-center pt-[10vh]'>
            <div className='box flex-col border-2 border-white p-4 rounded-lg w-[90%] md:w-1/2 shadow-xl'>
                <div className='text-[32px] my-4 text-white font-bold text-center'>TASKIFY</div>
                <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                <TodoList todos={state} setTodos={dispatch} />
            </div>
        </div>
    );
};

export default App;
