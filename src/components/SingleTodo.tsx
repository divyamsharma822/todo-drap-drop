import React, { useEffect, useRef, useState } from "react";
import { Actions, Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        // setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        // setTodos(todos.filter((todo) => todo.id !== id));
        setTodos({ type: "remove", payload: id });
    };

    const handleDone = (id: number) => {
        // setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
        setTodos({ type: "done", payload: id });
    };

    return (
        <form onSubmit={(e) => handleEdit(e, todo.id)} className={`todos__single flex justify-between w-full rounded-md p-2 bg-slate-200 items-center`}>
            {edit ? (
                <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='border-0 todos__single--text' ref={inputRef} />
            ) : todo.isDone ? (
                <span className='line-through decoration-[#4f709c] todos__single--text'>{todo.todo}</span>
            ) : (
                <span className='todos__single--text'>{todo.todo}</span>
            )}
            <div className='flex items-center gap-1'>
                <span data-text='Edit' className='tooltip text-[#4F709C] rounded-full p-1 hover:bg-slate-500/10'>
                    <AiFillEdit
                        size={20}
                        onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                    />
                </span>
                <span data-text='Delete' className='tooltip text-[#F45050] rounded-full p-1 hover:bg-slate-500/10' onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete size={20} />
                </span>
                <span data-text='Done' className='tooltip text-[#519872] rounded-full p-1 hover:bg-slate-500/10' onClick={() => handleDone(todo.id)}>
                    <MdDone size={20} />
                </span>
            </div>
        </form>
    );
};

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setTodos: React.Dispatch<Actions>;
}

export default SingleTodo;
