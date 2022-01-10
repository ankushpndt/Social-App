import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { LoadUsers } from '../features/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { SearchBox } from '../utils/SearchBox';
import { Backdrop } from '../utils/Backdrop';
export const SearchBar = () => {
  const [toggleDropbox, setToggleDropbox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (searchTerm !== '') {
        dispatch(LoadUsers());
      }
    }, 1000);
  }, [searchTerm, dispatch]);

  return (
    <div>
      <div className='search__bar'>
        {toggleDropbox && (
          <Backdrop
            toggle={setToggleDropbox}
            className='search__bar__backdrop'
          />
        )}
        <i className='fa fa-search'></i>
        <input
          type='search'
          value={searchTerm}
          onFocus={() => setToggleDropbox(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search__input'
          placeholder='Search'
        />
        {toggleDropbox && (
          <SearchBox
            setToggleDropbox={setToggleDropbox}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};
