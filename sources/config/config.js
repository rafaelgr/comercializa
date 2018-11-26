export const devConfig = {
    geturlApi: () => {
        var urlApi = "";
        if (!PRODUCTION) {
            urlApi = "http://localhost:5000";
        } else {
            urlApi = "http://proasistencia.ddns.net:8080";
        }
        return urlApi;
    },
    getConfig: () => {
        return new Promise((success, fail) => {
            if (!PRODUCTION) {
                return success({
                    urlApi: "http://localhost:5000"
                });
            }
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .get("/config")
                .then((result) => {
                    success(result.json());
                })
                .catch((inXhr) => {
                    fail(inXhr);
                });
        });
    }
}

