const filterAttachments = (attachments) => {
    if (!attachments) {
        return [];
    }

    return attachments.filter(attachment => attachment.type === 'photo');
};

export default filterAttachments;
