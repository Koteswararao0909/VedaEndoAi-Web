const API_BASE_URL = "http://localhost:8000"; // PASTE YOUR IP ADDRESS HERE (e.g., http://192.168.1.10:8000)

const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        REGISTER: `${API_BASE_URL}/api/auth/register`,
        VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email`,
        RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
        UPDATE_PROFILE: `${API_BASE_URL}/api/auth/update-profile`,
        DELETE_ACCOUNT: `${API_BASE_URL}/api/auth/delete-account`,
    },
    PATIENTS: {
        LIST: (email) => `${API_BASE_URL}/patients/?email=${email}`,
        GET: (id) => `${API_BASE_URL}/patients/${id}`,
        CREATE: `${API_BASE_URL}/patients/`,
        UPDATE: (id) => `${API_BASE_URL}/patients/${id}`,
        DELETE: (id) => `${API_BASE_URL}/patients/${id}`,
    },
    ANALYSIS: {
        PREDICT: `${API_BASE_URL}/predict/`,
    }
};

export default API_CONFIG;