import http from "./http";

const getShows = async (page, type, search) => {
  let params = "";
  if (type || search) {
    console.log(type, "type");
    let title = search ? { title: search } : {};
    let t = type ? { type: type } : {};
    let filter = JSON.stringify({ ...{ ...t, ...title } });
    console.log(page);
    params = "&search=" + encodeURIComponent(filter);
  }

  //if page is passed then page value will be used else by default page 1 will be fetched.
  return (await http.get(`/ott/show?page=${page ? page : 1}&limit=30` + params))
    .data;
};

const getShow = async (id) => {
  return (await http.get("/ott/show/" + id)).data;
};

const getWishlist = async () => {
  return (await http.get("/ott/watchlist/like")).data;
};

const addToWishlist = async (id) => {
  return (
    await http.patch("/ott/watchlist/like", {
      showId: id,
    })
  ).data;
};
const register = async ({ data }) => {
  return (await http.post("user/signup", data)).data;
};

const login = async ({ data }) => {
  return (await http.post("user/login", data)).data;
};

const updateProfileImage = async ({ data }) => {
  return (await http.patch("/user/updateProfileImage", data)).data;
};

const updateMe = async ({ data }) => {
  return (await http.patch("/user/updateMe", data)).data;
};

const updatePassword = async ({ data }) => {
  return (await http.patch("/user/updateMyPassword", data)).data;
};

const api = {
  getShows,
  getShow,
  getWishlist,
  addToWishlist,
  updateProfileImage,
  updateMe,
  register,
  login,
  updatePassword,
};

export default api;
