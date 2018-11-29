import { devConfig } from "../config/config";
export const clientesService = {
    getClientes: (usu) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/clientes";
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
    getClientesAgente: (usu, agenteId) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/clientes/agente/" + agenteId;
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
    getCliente: (usu, clienteId) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig().
                then(conf => {
                    var url = conf.urlApi + "/api/clientes/" + clienteId;
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
    postCliente: (usu, cliente) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/clientes";
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .post(url, cliente)

                })
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    },
    putCliente: (usu, cliente) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/clientes";
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })

                })
                .put(url, cliente)
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    },
    deleteCliente: (usu, clienteId) => {
        return new webix.promise((success, fail) => {
            devConfig().getConfig()
                .then(conf => {
                    var url = conf.urlApi + "/api/clientes/" + clienteId;
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                            "x-apiKey": usu.apiKey
                        })
                        .del(url)

                })
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    }
}