import { filterAttachments } from './index';

const filterSlides = array => array.filter(item => filterAttachments(item.attachments).length > 0);

export default filterSlides;
