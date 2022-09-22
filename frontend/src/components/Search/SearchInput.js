import React from 'react';

const SearchInput = ({ place, value, onChange }) => {
	return (
    <div>
      <input
        type="text"
				name={`${place}`}
				value={value}
        placeholder={`${place}를 입력하세요`}
				className='search-input'
				onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;