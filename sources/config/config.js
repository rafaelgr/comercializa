export const devConfig = {
    getApiUrl: () => {
        var urlApi = "";
        if (!PRODUCTION) urlApi = "http://localhost:5000";
        return urlApi;
    }
}

