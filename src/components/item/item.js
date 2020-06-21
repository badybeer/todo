import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Item({ todo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const handleEdit = () => setEditing(true);
  const handleCompleted = () => {
    onUpdate({
      id: todo.id,
      completed: !todo.completed,
      finishedTime: performance.now()
    });
  };

  if (todo.finishedTime === 0) {
    var elapsed = 0;
  } else {
    elapsed = Math.round(todo.finishedTime - todo.createdTime) / 1000;
  }
  var timestr = 'Elapsed time: ' + Math.round(elapsed) + ' seconds';
  if (elapsed > 60) {
    elapsed = 'Elapsed time: ' + Math.round(elapsed / 60);
    timestr = elapsed + ' minutes';
  } else if (elapsed > 3600) {
    elapsed = 'Elapsed time: ' + Math.round(elapsed / 3600);
    timestr = elapsed + ' hours';
  }

  const handleRemove = () => onRemove(todo.id);
  const handleChange = event => setName(event.target.value);

  const handleBlur = () => {
    onUpdate({
      id: todo.id,
      name
    });
    setEditing(false);
  };

  const { completed } = todo;

  const editButton = {
    position: 'absolute',
    top: '10px',
    right: '50px',
    width: '50px',
    height: '36px',
    fontSize: '14px',
    color: '#fff',
    marginBottom: '11px',
    letterSpacing: '3px',
    border: 'none',
    textAling: 'center',
    borderRadius: '4px',
    backgroundColor: '#b83f45'
  };

  const Timer = {
    marginLeft: '60px',
    fontSize: '12px'
  };

  if (todo.completed) {
    return (
      <li className={classNames({ completed, editing })} data-testid="todo-item">
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={handleCompleted} />
          <label data-testid="todo-name">{todo.name}</label>
          <button style={editButton} onClick={handleEdit} data-testid="todo-edit">
            edit
          </button>
          <button className="destroy" onClick={handleRemove} data-testid="todo-remove" />
          <div style={Timer}>{timestr}</div>
        </div>
        {editing && (
          <input className="edit" value={name} onInput={handleChange} onBlur={handleBlur} onChange={() => {}} />
        )}
      </li>
    );
  } else
    return (
      <li className={classNames({ completed, editing })} data-testid="todo-item">
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={handleCompleted} />
          <label data-testid="todo-name">{todo.name}</label>
          <button style={editButton} onClick={handleEdit} data-testid="todo-edit">
            edit
          </button>
          <button className="destroy" onClick={handleRemove} data-testid="todo-remove" />
        </div>
        {editing && (
          <input className="edit" value={name} onInput={handleChange} onBlur={handleBlur} onChange={() => {}} />
        )}
      </li>
    );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
