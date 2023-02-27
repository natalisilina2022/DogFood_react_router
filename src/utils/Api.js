const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
		this._token = `Bearer ${token}`;
		this._baseUrl = baseUrl;
	}

	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

	getProductById(idProduct) {
		return fetch(`${this._baseUrl}/products/${idProduct}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

	//можно объявить как метод Api, можно сразу в useEffect использовать Promise.all
	getAppInfo() {
		return Promise.all([this.getProductList(), this.getUserInfo()]);
	}


	search(searchQuery){
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`,{
            headers: {
                authorization: this._token
            }
        }).then( response => response.ok ? response.json() : Promise.reject(response.status))
    }


	addProduct({ available, pictures, name, price, discount, stock, wight, description }) {
		return fetch(`${this._baseUrl}/products`, {
			method: "POST",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				price,
				description,
				discount,
				stock,
				wight,
				pictures,
				available
			}),
		}).then(onResponce);
	}

	removeProduct(productID) {
		return fetch(`${this._baseUrl}/products/${productID}`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}



	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				about,
			}),
		}).then(onResponce);
	}

	setUserAvatar({ avatar }) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				avatar,
			}),
		}).then(onResponce);
	}

	changeLikeProductStatus(productID, like) {
		// Обычная реализация: 2 разных метода для удаления и постановки лайка.
		return fetch(`${this._baseUrl}/products/likes/${productID}`, {
			method: like ? "PUT" : "DELETE",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
		}).then(onResponce);
	}
}

const config = {
    baseUrl:'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2YTNmOTU5Yjk4YjAzOGY3N2I1MDQiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MDU5ODkzLCJleHAiOjE3MDc1OTU4OTN9.IMqZSFdNNe5qGC9w76F5H6-2x_7wxc-8F_5hIiVRt5s'
}

const api = new Api(config)

export default api;
