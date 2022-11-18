import axios from "axios";

const urlAPI = "http://localhost:5254/api/Home/";

const login = async (username, senha) => {
    const response = await axios
        .post(urlAPI + "login", {
            username,
            senha,
        });
    console.log("response: " + JSON.stringify(response.data.token));
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};
const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    login,
    logout,
    getCurrentUser,
};
export default AuthService;