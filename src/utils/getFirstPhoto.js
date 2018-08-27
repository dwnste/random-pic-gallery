import { filterAttachments } from './index';

const getFirstPhoto = attachments => filterAttachments(attachments)[0].photo.sizes[6].url;

export default getFirstPhoto;
