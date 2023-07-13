import React, { useEffect, useRef, useState } from "react";
import { Todo, Actions } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos({ type: "edit", payload: { todo: editTodo, id: id } });
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setTodos({ type: "remove", payload: id });
    };

    const handleDone = (id: number) => {
        setTodos({ type: "done", payload: id });
    };

    return (
        <Draggable
            draggableId={todo.id.toString()}
            index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`todos__single flex justify-between w-full rounded-md p-2 bg-slate-200 items-center ${
                        snapshot.isDragging ? "drag" : ""
                    }`}
                    ref={provided.innerRef}>
                    {edit ? (
                        <input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className='border-0 todos__single--text'
                            ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <i className='line-through decoration-[#ff0000] todos__single--text'>{todo.todo}</i>
                    ) : (
                        <span className='todos__single--text'>{todo.todo}</span>
                    )}
                    <div className='flex items-center gap-1'>
                        <span
                            data-text='Edit'
                            className='tooltip text-[#4F709C] rounded-full p-1 hover:bg-slate-500/10'>
                            <AiFillEdit
                                size={20}
                                onClick={() => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(!edit);
                                    }
                                }}
                            />
                        </span>
                        <span
                            data-text='Delete'
                            className='tooltip text-[#F45050] rounded-full p-1 hover:bg-slate-500/10'
                            onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete size={20} />
                        </span>
                        <span
                            data-text='Done'
                            className='tooltip text-[#519872] rounded-full p-1 hover:bg-slate-500/10'
                            onClick={() => handleDone(todo.id)}>
                            <MdDone size={20} />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<Actions>;
}

export default SingleTodo;
