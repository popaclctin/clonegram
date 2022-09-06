import React, { useState } from 'react';
import { useSearchUserQuery } from '../../store/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isSuccess, isError, error } = useSearchUserQuery(
    searchTerm,
    { skip: !searchTerm }
  );

  const changeHandler = (event) => {
    setSearchTerm(event.target.value);
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
      />
      {isSuccess && data ? (
        <div className='header__search__results'>
          <ul>
            {data.users.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SearchInput;
