import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FILTERS } from '../../constants/filter';
import { selectCompleted, selectNotCompleted } from '../../store/selectors/todo';
import { onFilterSelect } from '../../store/actions/filter';

export function Category() {
  const filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Complete' }
  ];
  const dispatch = useDispatch();
  const completedCount = useSelector(state => selectCompleted(state.todos).length);
  const itemsLeft = useSelector(state => selectNotCompleted(state.todos).length);
  const filter = useSelector(state => state.filter);
  const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));

  const itemText = itemsLeft === 1 ? 'item' : 'items';

  return (
    <footer className="footer">
      <ul className="filters">
        {filterTitles.map(filterTitle => (
          <li key={filterTitle.key}>
            <a
              href="./#"
              className={classNames({ selected: filterTitle.key === filter })}
              onClick={() => filterSelect(filterTitle.key)}
            >
              {filterTitle.value}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
