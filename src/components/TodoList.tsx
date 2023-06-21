import React from "react";
import { Actions, Todo } from "../model";
import SingleTodo from "./SingleTodo";

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
    return (
        <div className='flex flex-col gap-2 my-3 todos'>
            {todos?.map((todo, index) => (
                <SingleTodo index={index} todos={todos} todo={todo} key={todo.id} setTodos={setTodos} />
            ))}
        </div>
    );
};

interface Props {
    todos: Todo[];
    // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setTodos: React.Dispatch<Actions>;
}

export default TodoList;
