import API from "./axiosInterceptors.js";

export const fetchFromTMDB = async (url) => {

	const response = await API.get(url);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	return response.data;
};


