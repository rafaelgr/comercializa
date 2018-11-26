import { devConfig } from "../config/config";
export const localesAfectadosService = {
    getLocalesAfectados: (usu) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados";
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .get(url)
                })
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
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados/servicio/" + servicioId;
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .get(url)

                })
                .then((result) => {
                    success(result.json());
                })
                .catch((inXhr) => {
                    fail(inXhr);
                });
        });
    },
    getLocalAfectado: (usu, localAfectadoId) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados/" + localAfectadoId;
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .get(url)

                })
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
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados";
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .post(url, { localAfectado: localAfectado })

                })
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
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados/" + localAfectado.localAfectadoId;
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .put(url, { localAfectado: localAfectado });

                })
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
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/locales_afectados/" + localAfectadoId;
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .del(url);

                })
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