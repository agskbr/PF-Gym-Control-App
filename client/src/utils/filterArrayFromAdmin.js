const filterBy = (arrayToFilter, stringFilterBy) => {
  let filteredArr = [];

  if (stringFilterBy === "Ultimos creados") {
    filteredArr = arrayToFilter.sort(
      (date1, date2) =>
        new Date(date2.createdAt).getTime() -
        new Date(date1.createdAt).getTime()
    );
  }
  if (stringFilterBy === "Ultimos modificados") {
    filteredArr = arrayToFilter.sort(
      (date1, date2) =>
        new Date(date2.updatedAt).getTime() -
        new Date(date1.updatedAt).getTime()
    );
  }
  return filteredArr;
};

export { filterBy };
