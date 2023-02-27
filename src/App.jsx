import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Search from "./components/Search";
import SearchInfo from "./components/SearchInfo";
import api from "./utils/Api";
import useDebounce from "./hooks/useDebouce";
import CatalogPage from "./pages/Catalog/Catalog";
import ProductPage from "./pages/Product/Product";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from './context/curretUserContext';

import NotFound from './pages/NotFound/NotFound';
import { ThemeContext, themes } from "./context/themeContext";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [isLoading, setIsloading] = useState(false);
	const [theme, setTheme] = useState(themes.light)
	const debounceValue = useDebounce(searchQuery, 500);
	const navigate = useNavigate()



	useEffect(() => {
		Promise.all([api.getProductList(), api.getUserInfo()])
			.then(([productData, userData]) => {
				setCurrentUser((prevState) => userData);
				setCards((prevState) => productData);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		handleRequest();
	}, [debounceValue]);

	const handleRequest = () => {
		setIsloading(true);
		api.search(debounceValue)
			.then((data) => {
				setCards((prevState) => data);
			})
			.catch((err) => console.log(err))
			.finally(() => setTimeout(() => setIsloading(false), 300));
	};

	const handleFormSubmit = (inputValue) => {
		setSearchQuery(inputValue);
		navigate("/");
		handleRequest();
	}

	const handleInputChange = (inputValue) => {
		setSearchQuery(inputValue);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	function handleUpdateUser(userUpdate) {
		api.setUserInfo(userUpdate).then((newUserData) => {
			setCurrentUser(newUserData);
		});
	}

	function handleProductLike(product) {
		const isLiked = product.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
		api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => {
			// в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
			const newCards = cards.map((c) => {
				console.log("Карточка в переборе", c);
				console.log("Карточка в c сервера", newCard);
				return c._id === newCard._id ? newCard : c;
			});
			setCards(newCards);
		});
	}

	const toggleTheme = () => {
		theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark)
	};

	return (
		<>
			<ThemeContext.Provider value={{theme: themes.light, toggleTheme: toggleTheme}}>
				<CurrentUserContext.Provider value={currentUser}>
					<Header onUpdateUser={handleUpdateUser}>
						<Logo href="/" title="Логотип" />
						<Search
							searchText={searchQuery}
							handleFormSubmit={handleFormSubmit}
							handleInputChange={handleInputChange}
							clearSearch={clearSearch}
						/>
					</Header>
					<div className="content container" style={{backgroundColor: theme.background}}>
						<SearchInfo
							searchText={searchQuery}
							searchCount={cards.length}
						/>


						<Routes>
							<Route index element={
									<CatalogPage
										searchQuery={searchQuery}
										cards={cards}
										handleProductLike={handleProductLike}
										isLoading={isLoading}
									/>}
							/>
							<Route path="/product/:id/" element={
								<ProductPage
									handleProductLike={handleProductLike}
							/>}
							/>
							<Route path="*" element={<NotFound/>}/>

						</Routes>
					</div>
					<Footer />
				</CurrentUserContext.Provider>
			</ThemeContext.Provider>

		</>
	);
};

export default App;
