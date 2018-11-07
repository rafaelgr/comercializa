import { devConfig } from "../config/config";
export const tiposProfesionalService = {
    getTiposProfesional: (usu) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/tipos_profesional";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .get(url)
                .then((result) => {
                    success(result.json());
                })
                .catch((inXhr) => {
                    fail(inXhr);
                });
        });
    },
    getSyncTiposProfesional: (usu) => {
        var url = devConfig.getApiUrl() + "/api/tipos_profesional";
        var res = webix.ajax()
            .headers({
                "Content-Type": "application/json",
                "x-apiKey": usu.apiKey
            })
            .sync()
            .get(url);
        var result = { data: null, err: null };
        if (res.status != 200) {
            result.err = res;
        } else {
            result.data = JSON.parse(res.response);
        }
        return result;
    },
    getTipoProfesional: (usu, tipoProfesionalId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/tipos_profesional/" + tipoProfesionalId;
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .get(url)
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        })

    },
    postTipoProfesional: (usu, grupoUsuario) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/tipos_profesional";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .post(url, grupoUsuario)
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });

        });
    },
    putTipoProfesional: (usu, grupoUsuario) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/tipos_profesional";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .put(url, grupoUsuario)
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    },
    deleteTipoProfesional: (usu, tipoProfesionalId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/tipos_profesional/" + tipoProfesionalId;
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .del(url)
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    }
}