import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        console.log(result);

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let add;
        let active = todos;
        let complete = completedTodos;
        // Source Logic
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        // Destination Logic
        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setTodos(active);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='app flex flex-col items-center pt-[10vh]'>
                <div className='box flex-col border-2 border-white p-4 rounded-lg w-[90%] md:w-3/4 shadow-xl'>
                    <div className='text-[32px] my-4 text-white font-bold text-center'>TASKIFY</div>
                    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                    <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
                </div>
            </div>
        </DragDropContext>
    );
};

export default App;
