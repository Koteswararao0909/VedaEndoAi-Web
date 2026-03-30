const API_BASE_URL = "http://127.0.0.1:8000";

const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        REGISTER: `${API_BASE_URL}/api/auth/register`,
        VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email`,
        RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
        UPDATE_PROFILE: `${API_BASE_URL}/api/auth/update-profile`,
    },
    PATIENTS: {
        LIST: (email) => `${API_BASE_URL}/patients/?email=${email}`,
        GET: (id) => `${API_BASE_URL}/patients/${id}`,
        CREATE: `${API_BASE_URL}/patients/`,
        UPDATE: (id) => `${API_BASE_URL}/patients/${id}`,
        DELETE: (id) => `${API_BASE_URL}/patients/${id}`,
    }
};

export default API_CONFIG;
