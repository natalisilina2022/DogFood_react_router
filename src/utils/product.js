export const calcDiscountPrice = (price, discount) => {
	return Math.round(price - price * discount / 100);
}

export const isLiked = (likes, userId) => {
	return likes?.some(i => i === userId);
}
