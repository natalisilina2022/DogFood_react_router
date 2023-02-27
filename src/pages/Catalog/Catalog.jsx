import React from "react";

import Sort from "../../components/Sort";
import Cards from "../../components/Cards";
import Spinner from "../../components/Spinner";

const CatalogPage = ({isLoading, cards, handleProductLike} ) => {
	return (
		<>
				<Sort />
				<div className="content__cards">
					{isLoading ? (
						<Spinner />
					) : (
						<Cards
							goods={cards}
							onProductLike={handleProductLike}
						/>
					)}
				</div>
		</>
	);
};

export default CatalogPage;
