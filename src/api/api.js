import fetchJsonp from 'fetch-jsonp';
import { vkAPI, version, groups } from '../consts';
import { parseResponse, getUrlString, getRandomItem } from '../utils';

const defaultParams = {
    v: version,
    access_token: process.env.REACT_APP_ACCESS_TOKEN,
    owner_id: getRandomItem(groups),
};

const get = url => fetchJsonp(url).then(res => res.json());

const getImages = (size = 10, offset = 0) => {
    const params = {
        ...defaultParams,
        size,
        offset,
    };

    const url = getUrlString(vkAPI, params);

    return get(url).then(parseResponse);
};

export { getImages };
