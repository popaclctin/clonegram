import React, { useState } from 'react';
import { useSearchUserQuery } from '../../store/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchInput.style.scss';
import { Link } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(true);

  const { data, isLoading, isSuccess, isError, error } = useSearchUserQuery(
    searchTerm,
    { skip: !searchTerm }
  );

  const changeHandler = (event) => {
    setSearchTerm(event.target.value);
    setShowResults(true);
  };

  return (
    <div className='header__search'>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className='header__search__icon'
      />
      <input
        type='text'
        placeholder='Search'
        className='header__search__input'
        value={searchTerm}
        onChange={changeHandler}
        onFocus={() => setShowResults(true)}
      />
      {isSuccess
        ? showResults && (
            <SearchResults
              users={data.users}
              onClose={() => {
                setShowResults(false);
              }}
            />
          )
        : null}
    </div>
  );
}

const SearchResults = ({ users, onClose }) => {
  const modalRef = useClickOutside(onClose);
  return (
    <div ref={modalRef} className='header__search__results'>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={onClose}>
            <Link to={`/${user.username}`}>
              <p className='header__search__results__username'>
                {user.username}
              </p>
              <p className='header__search__results__fullname'>
                {user.fullName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
