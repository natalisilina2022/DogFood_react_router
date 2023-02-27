import React, { useContext } from "react";
import s from "./index.modules.css";
import cn from 'classnames';
import { CurrentUserContext } from './../../context/curretUserContext';
import { ThemeContext } from "../../context/themeContext";

const Header = ({children, onUpdateUser}) => {
	const currentUser = useContext(CurrentUserContext);
	const theme = useContext(ThemeContext);

	const handleClickButtonEdit = (e) => {
		e.preventDefault();
		theme.toggleTheme();
		onUpdateUser({name: "Василий", about: "Ментор"})
	}

	return (
		<header className={cn(s.header,'cover')}>
			<div className="container">
				<div className={s.header__wrapper}>
					{children}

					<div className={s.profile}>
						{currentUser?.email && <span>{currentUser.email}</span>}
						{currentUser?.name && <span>{currentUser.name}: {currentUser.about}</span>}
						<button onClick={handleClickButtonEdit} className="btn btn_type_secondary">
							Изменить
						</button>
					</div>

				</div>
			</div>
		</header>
	);
};

export default Header;
