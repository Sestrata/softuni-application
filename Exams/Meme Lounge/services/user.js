import { setUserInfo, clearUserInfo } from "../utils.js";
import { post, get } from "./api.js";

export async function login(data) {
    const res = await post('/users/login', data);
    if (res) {
        setUserInfo({
            accessToken: res.accessToken,
            username: res.username,
            email: res.email,
            id: res._id,
            gender: res.gender
        });
    }
}

export async function register(data) {
    const res = await post('/users/register', data);
    if (res) {
        setUserInfo({
            accessToken: res.accessToken,
            username: res.username,
            email: res.email,
            id: res._id,
            gender: res.gender
        });
    }
}

export async function logout() {
    await get('/users/logout');
    clearUserInfo();
}
