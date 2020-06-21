import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FILTERS } from '../../constants/filter';
import { selectCompleted, selectNotCompleted } from '../../store/selectors/todo';
import { onFilterSelect } from '../../store/actions/filter';

export function Footer() {
  const dispatch = useDispatch();
  const completedCount = useSelector(state => selectCompleted(state.todos).length);
  const itemsLeft = useSelector(state => selectNotCompleted(state.todos).length);
  const allCount = completedCount + itemsLeft;
  const filter = useSelector(state => state.filter);
  const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));

  const counters = [
    { key: FILTERS.all, value: allCount },
    { key: FILTERS.active, value: itemsLeft },
    { key: FILTERS.completed, value: completedCount }
  ];

  const counter = {};

  return (
    <footer className="footer">
      <ul className="filters">
        <div style={counter}>
          {counters.map(counter => (
            <li key={counter.key}>
              <a
                href="./#"
                className={classNames({ selected: counter.key === filter })}
                onClick={() => filterSelect(counter.key)}
              >
                {counter.value}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </footer>
  );
}
