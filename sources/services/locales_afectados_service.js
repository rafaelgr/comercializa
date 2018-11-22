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
    getLocalAfectado: (usu, servicioId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + servicioId;
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
    postLocalAfectado: (usu, servicio) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .post(url, {servicio: servicio})
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });

        });
    },
    putLocalAfectado: (usu, servicio) => {
        servicio = serviciosService.cleanLocalAfectado(servicio);
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + servicio.servicioId;
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json",
                    "x-apiKey": usu.apiKey
                })
                .put(url, {servicio: servicio})
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    },
    deleteLocalAfectado: (usu, servicioId) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/locales_afectados/" + servicioId;
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