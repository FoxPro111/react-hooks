import React from 'react';

const list = props => {
    console.log('Rendering...');

    return (
        <ul>
            {props.list.map(todo =>
                <li
                    onClick={props.clicked.bind(this, todo.id)}
                    key={todo.id}>{todo.name}</li>
            )}
        </ul>
    );
};

export default list;