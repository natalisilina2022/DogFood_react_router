import React, {useCallback, useEffect, useState} from "react";

import api from "../../utils/Api";
import Spinner from '../../components/Spinner/index';
import Product from '../../components/Product/Product';
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useApi } from './../../hooks/useApi';

const ProductPage = ({handleProductLike}) => {
	const { id } = useParams();

	const handler = useCallback(() => {
		return api.getProductById(id);
	  }, [id]);


	const { data: product, loading, error } = useApi(handler);
	return (
		<>

			{loading && <Spinner/>}

			{error && <NotFound/>}

			{product && <Product {...product} onProductLike={handleProductLike}/>}

		</>
	);
}

export default ProductPage;
