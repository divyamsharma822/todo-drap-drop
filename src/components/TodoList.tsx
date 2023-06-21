import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className='relative flex flex-col gap-2 lg:flex-row'>
            <Droppable droppableId='TodosList'>
                {(provided, snapshot) => (
                    <div
                        className={`todos flex flex-col min-w-[50%] gap-2 p-2 my-3 rounded-md bg-[#3b79a0] h-fit ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            <div className='text-center text-lg font-semibold text-[#ffffff] py-2'>Active Tasks</div>
                            {todos?.map((todo, index) => (
                                <SingleTodo index={index} todos={todos} todo={todo} key={todo.id} setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos flex flex-col min-w-[50%] gap-2 p-2 my-3 rounded-md bg-[#519872] h-fit ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}>
                            <div className='text-center text-lg font-semibold text-[#ffffff] py-2'>Completed Tasks</div>
                            {completedTodos?.map((todo, index) => (
                                <SingleTodo index={index} todos={completedTodos} todo={todo} key={todo.id} setTodos={setCompletedTodos} />
                            ))}
                            {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default TodoList;
