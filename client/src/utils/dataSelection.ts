// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectData = (name: string, data: any, map?: string) => {
  const selectedData = localStorage.getItem("companyData");
  if (selectedData) {
    const selectedDataObj = JSON.parse(selectedData);
    if (selectedDataObj[name]) {
      delete selectedDataObj[name];
      localStorage.setItem("companyData", JSON.stringify(selectedDataObj));
      return false;
    } else {
      selectedDataObj[name] = data;
      localStorage.setItem("companyData", JSON.stringify(selectedDataObj));
      return true;
    }
  } else {
    const selectedDataObj = {
      [name]: data,
    };
    localStorage.setItem("companyData", JSON.stringify(selectedDataObj));
    return true;
  }
};

export const ifSelected = (name: string) => {
  const selectedData = localStorage.getItem("companyData");
  if (selectedData) {
    const selectedDataObj = JSON.parse(selectedData);
    if (selectedDataObj[name]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
