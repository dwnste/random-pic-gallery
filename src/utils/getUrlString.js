const getUrlString = (hostAndPath, params = {}) => {
    const url = new URL(hostAndPath);

    Object.keys(params).forEach((key) => {
        url.searchParams.set(key, params[key]);
    });

    return url.toString();
};

export default getUrlString;
