// cache the outcome of given function
function cached(fn) {
	const cache = Object.create(null);
	return function cachedFn(str) {
		const hit = cache[str];
		return hit || (cache[str] = fn(str));
	};
}

module.exports = cached;
