import React from "react";
import Card from "../Card";
import './index.css';

const Cards = ({goods, onProductLike}) => {
	return (
		<div className="cards">
			{goods.map((item) =>
				(<Card key={item._id} product={item} {...item} onProductLike={onProductLike}/>)
			)}
		</div>
	);
};

export default Cards;
