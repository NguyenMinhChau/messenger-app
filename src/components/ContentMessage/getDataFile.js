/* eslint-disable array-callback-return */
export const getFiles = (message) => {
    const dataImageFiles = [];
    const dataVideoFiles = [];
    const dataApplicationFiles = [];
    message.file.map((file) => {
        if (file.type.includes('image')) {
            dataImageFiles.push(file);
        }
        if (file.type.includes('video')) {
            dataVideoFiles.push(file);
        }
        if (file.type.includes('application')) {
            dataApplicationFiles.push(file);
        }
    });
    return {
        dataImageFiles,
        dataVideoFiles,
        dataApplicationFiles,
    };
};
