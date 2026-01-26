const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://papero-library.onrender.com'
};

export default CONFIG;
