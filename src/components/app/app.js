import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLoad } from '../../store/actions/todo';
import { TodoLocal } from '../../services/todo-local';
import { Header } from '../header/header';
import { List } from '../list/list';
import { Footer } from '../footer/footer';
import { CopyRight } from '../copy-right/copy-right';
import { Category } from '../category/category';

export function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(onLoad(TodoLocal.loadTodos()));
  }, [dispatch]);

  useEffect(() => {
    TodoLocal.storeTodos(todos);
  }, [todos]);

  return (
    <div id="app">
      <section className="todoapp">
        {!!todos.length && <Category />}
        <Header />
        {!!todos.length && <List />}
        {!!todos.length && <Footer />}
      </section>
      <CopyRight />
    </div>
  );
}
