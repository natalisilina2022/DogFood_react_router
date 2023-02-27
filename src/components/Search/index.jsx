import React, {useState, useEffect} from "react";
import "./index.css";
import {ReactComponent as SearchIcon} from "./img/ic-search.svg";
import {ReactComponent as CloseSearch} from "./img/ic-close-input.svg";


const Search = ({searchText = '', handleFormSubmit = null, handleInputChange = null, clearSearch = null}) => {
	const [searchQuery, setSearchQuery] = useState('');
	useEffect(()=> {
		setSearchQuery(searchText);
	}, [searchText])

	const handleForm = (e) => {
		e.preventDefault();
		setSearchQuery(e.target.querySelector('.search__input')?.value)
		handleFormSubmit && handleFormSubmit(e.target.querySelector('.search__input')?.value)
	}

	const handleInput = (e) => {
		setSearchQuery(e.target.value);
		handleInputChange && handleInputChange(e.target.value)
	}
	return (
		<form className="search" onSubmit={handleForm}>
			<input type="text" placeholder="Поиск" className="search__input" value={searchQuery} onInput={handleInput}/>
			<button className="search__btn">
				{searchText === "" && <SearchIcon/>}
				{searchText !== "" && <CloseSearch onClick={clearSearch}/>}
			</button>
		</form>
	);
};

export default Search;
