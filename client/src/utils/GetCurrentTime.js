import api from "./Axios";

async function getCurrentTime() {
    try {
        const response = await api.get(`/secure-time`);
        return response.data.data;
    } catch (error) {
        return null;
    }
}

export default getCurrentTime;
