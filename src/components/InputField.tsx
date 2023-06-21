import React, { useRef } from "react";
import "./styles.css";

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className='relative bg-white rounded-full input'
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}>
            <input type='text' ref={inputRef} className='relative w-[90%] h-auto p-2 rounded-full md:p-4 input__box' placeholder='Enter task...' onChange={(e) => setTodo(e.target.value)} value={todo} />
            <button
                type='submit'
                className='input__submit absolute bg-[#519872] aspect-square h-[90%] right-[3px] md:right-1 top-1 bottom-1 rounded-full my-auto shadow-lg hover:scale-[0.9] text-white font-bold transition '>
                Go
            </button>
        </form>
    );
};

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

export default InputField;
