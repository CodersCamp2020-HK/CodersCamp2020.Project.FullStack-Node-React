const formatDate = (date: string): string => {
    const givenDate = new Date(date);

    if (!givenDate.getFullYear()) {
        return 'Brak informacji';
    }

    const day = givenDate.getDate();
    const month = givenDate.getMonth() + 1;
    const year = givenDate.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

export default formatDate;
