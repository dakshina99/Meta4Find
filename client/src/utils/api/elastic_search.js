import baseApi from "./@baseURL";


const search = async (parameter) => {
  try {
    const res = await baseApi.get(`search?parameter=${parameter}`);
    return res;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 500) {
      return error.response;
    }
    console.log(error);
  }

};


export {search};