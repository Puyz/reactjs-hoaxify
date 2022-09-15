import axios from "axios"; // Axios, Http Request için kullandığımız bir library'dir.

// !!!!!   Axios Asekron çalışır. Cevap gelene kadar beklemez ondan sonraki kodlar çalışmayada devam eder.
// direk /api/1.0/users yazarsak spring portu 8080 olduğu için hata verir o yüzden package.json'da proxy ayarı yapmamız lazım.
export const signupRequest = (body) => {
    return axios.post('/api/1.0/users', body);
}

// export = public

export const changeLanguage = language => {
    return axios.defaults.headers['accept-language'] = language;
}

export const loginRequest = (creds) => {
    return axios.post('/api/1.0/auth', creds);
}
export const logoutRequest = () => {
    return axios.post('/api/1.0/logout');
}


export const setAuthorizationHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationValue = `Bearer ${token}`
        return axios.defaults.headers['Authorization'] = authorizationValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUsers = (page = 0) => {
    return axios.get(`/api/1.0/users?page=${page}`);
}
export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}
export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
}
export const postHoax = (hoax) => {
    return axios.post('/api/1.0/hoaxes', hoax);
}
export const getHoaxes = (username, page = 0) => {
    const path = (username) ? `/api/1.0/users/${username}/hoaxes?page=${page}` : `/api/1.0/hoaxes?page=${page}`;
    return axios.get(path);
}
export const getOldHoaxes = (username, id) => {
    const path = (username) ? `/api/1.0/users/${username}/hoaxes/${id}` : `/api/1.0/hoaxes/${id}`;
    return axios.get(path);
}
export const getNewHoaxCount = (username, id) => {
    const path = (username) ? `/api/1.0/users/${username}/hoaxes/${id}?count=true` : `/api/1.0/hoaxes/${id}?count=true`;
    return axios.get(path);
}
export const getNewHoaxes = (username, id) => {
    let path = (username) ? `/api/1.0/users/${username}/hoaxes/${id}?direction=after` : `/api/1.0/hoaxes/${id}?direction=after`;
    return axios.get(path);
}
export const postHoaxAttachment = attachment => {
    return axios.post("/api/1.0/hoax-attachments", attachment);
}
export const deleteHoax = id => {
    return axios.delete(`/api/1.0/hoaxes/${id}`);
}
export const deleteUser = username => {
    return axios.delete(`/api/1.0/users/${username}`);
}