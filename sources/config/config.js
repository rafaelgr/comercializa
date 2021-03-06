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
                    urlApi: "http://localhost:5000",
                    urlClient: "http://localhost:8089",
                    one_push_url: "https://onesignal.com/api/v1/notifications",
                    one_app_id: "ff4726ef-84ad-448d-ac78-b4beecf02f0b",
                    one_api_key: "Yzk2ZWY5NTctOWQ2Yi00ZTc5LTk5NzItOTI1NTVlYzdlZGU5"
                });
            }
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json"
                })
                .get("/config")
                .then((result) => {
                    success(result.json());
                })
                .catch((inXhr) => {
                    fail(inXhr);
                });
        });
    },
    getVersion: () => {
        return new Promise((success, fail) => {
            if (!PRODUCTION) {
                return success({
                    version: "1.0.0"
                });
            }
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json"
                })
                .get("/version")
                .then((result) => {
                    success(result.json());
                })
                .catch((inXhr) => {
                    fail(inXhr);
                });
        });
    }
}

