import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import List from './List.js';
import axios from 'axios';

import { useFormInput } from '../hooks/hooks';

const ToDo = props => {
    // const [todoName, setTodoName] = useState('');
    // const [inputIsValid, setInputIsValid] = useState(false);
    const todoInput = useFormInput();
    // const todoInputRef = useRef(null);

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.id);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);
    useEffect(() => {
        axios
            .get('https://react-hooks-d2c1f.firebaseio.com/todos.json')
            .then(res => {
                const todoData = res.data;
                const todos = [];
                for (const key in todoData) {
                    todos.push({
                        id: key,
                        name: todoData[key].name
                    });
                }

                dispatch({ type: 'SET', payload: todos });

                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const mouseMoveHandler = event => {
        // console.log(event.clientX, event.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    });

    // function inputChangeHandler(event) {
    //     setTodoName(event.target.value);

    // }

    function updateTodoList() {
        const todoName = todoInput.value;

        if (todoName) {
            axios
                .post('https://react-hooks-d2c1f.firebaseio.com/todos.json', {
                    name: todoName
                })
                .then(res => {
                    console.log(res);
                    const todoItem = {
                        id: res.data.name,
                        name: todoName
                    };

                    dispatch({ type: 'ADD', payload: todoItem });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const todoRemoveHandler = todoId => {
        axios.delete(`https://react-hooks-d2c1f.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        dispatch({ type: 'REMOVE', id: todoId });
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="ToDo"
                value={todoInput.value}
                onChange={todoInput.onChange}
                style={{ backgroundColor: todoInput.validity ? 'transparent' : 'red' }}
            />
            <button type="button" onClick={updateTodoList}>Add</button>
            {useMemo(
                () => (
                    <List list={todoList} clicked={todoRemoveHandler} />
                ),
                [todoList]
            )}
        </React.Fragment>
    );
};

export default ToDo;