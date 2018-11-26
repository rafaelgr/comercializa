import { devConfig } from "../config/config";
export const localesAfectadosService = {
    getLocalesAfectados: (usu) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados";
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
    getLocalesAfectadosServicio: (usu, servicioId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/servicio/" + servicioId;
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
    getSyncLocalesAfectados: (usu) => {
        var url = devConfig.getApiUrl() + "/api/locales_afectados";
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
    getLocalAfectado: (usu, localAfectadoId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + localAfectadoId;
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
    postLocalAfectado: (usu, localAfectado) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .post(url, {localAfectado: localAfectado})
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });

        });
    },
    putLocalAfectado: (usu, localAfectado) => {
        localAfectado = localesAfectadosService.cleanLocalAfectado(localAfectado);
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + localAfectado.localAfectadoId;
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .put(url, {localAfectado: localAfectado})
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    },
    deleteLocalAfectado: (usu, localAfectadoId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + localAfectadoId;
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
    },
    cleanLocalAfectado: (servicio) => {
        delete servicio.direccion;
        delete servicio.usuario;
        delete servicio.cliente;
        delete servicio.agente;
        delete servicio.tipoProfesional;
        delete servicio.fechaSolicitud;
        return servicio;
    }
}