export const devConfig = {
    getApiUrl: () => {
        var urlApi = "";
        if (!PRODUCTION){
            urlApi = "http://localhost:5000";
        }else {
            urlApi = "http://proasistencia.ddns.net:8080";
        } 
        return urlApi;
    }
}

