import { filterAttachments } from './index';

const getFirstPhoto = (attachments) => {
    const { photo: { sizes } } = filterAttachments(attachments)[0];

    return sizes[sizes.length - 1].url;
};

export default getFirstPhoto;
