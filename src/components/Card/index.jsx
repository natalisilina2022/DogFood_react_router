import React, { useContext } from "react";
import cn from "classnames";

import './index.css';
import {ReactComponent as Save} from './img/save.svg'
import { calcDiscountPrice, isLiked } from './../../utils/product';
import { Link } from "react-router-dom";
import { CurrentUserContext } from './../../context/curretUserContext';


const Card = ({product, onProductLike, name, price, discount, wight, description, available, stock, pictures, tags}) => {
	const currentUser = useContext(CurrentUserContext);
	const discountPrice = calcDiscountPrice(price, discount);
	const isLike = isLiked(product.likes, currentUser._id);

	function handleLikeClick() {
		onProductLike(product);
	}

	return (
		<div className="card">
			<div className="card__sticky card__sticky_type_top-left">
				{discount !== 0
				&& <span className="card__discount ">
					{`-${discount}%`}
				</span>
				}

				{tags && tags.map((tag, i) =>
					<span className={cn('tag',{[`tag_type_${tag}`]: true})} key={`${i}-${tag}`}>{tag}</span>
				)}
			</div>
			<div className="card__sticky card__sticky_type_top-right">
			<button className="card__favorite" onClick={handleLikeClick}>
                <Save className={cn('card__favorite-icon', {'card__favorite-icon_active': isLike})}/>
            </button>
			</div>
			<Link to={`/product/${product._id}`} className="card__link">
				<img src={pictures} alt={description} className="card__image"/>
				<div className="card__desc">
					<span className={discount !== 0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
					{discount !== 0 && <span className="card__price card__price_type_discount">{discountPrice}&nbsp;₽</span>}
					<span className="card__wight">{wight}</span>
					<p className="card__name">{name}</p>
				</div>
			</Link>
			<a href="/#" className="card__cart btn btn_type_primary">
				В корзину
			</a>
		</div>
	);
};

export default Card;
