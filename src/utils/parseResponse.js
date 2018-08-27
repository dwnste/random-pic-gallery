const parseResponse = (response) => {
    if (!response.error) {
        const { response: { items } } = response;
        return items;
    }
    return [];
};

export default parseResponse;
