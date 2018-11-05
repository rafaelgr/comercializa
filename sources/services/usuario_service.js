import { cookieApi } from "../utilities/cookies";
import { devConfig } from "../config/config";
export const usuarioService = {
    // getUsuarioCookie
    // Obtains usuario infor information from its cookie if there isn't
    // an usuario cookie returns null
    getUsuarioCookie: () => {
        var usuario = cookieApi.getCookie('gdes_pipeline_usuario');
        if (!usuario) return null;
        return JSON.parse(usuario);
    },
    // setUsuarioCookie
    // Saves usuario's information in a cookie
    setUsuarioCookie: (usuario) => {
        cookieApi.setCookie('gdes_pipeline_usuario', JSON.stringify(usuario), 1);
    },
    deleteUsuarioCookie: (usuario) => {
        cookieApi.deleteCookie('gdes_pipeline_usuario');
    },
    checkLoggedUser: () => {
        // Auth url
        var authUrl = devConfig.getApiUrl() + "/auth/openid"
        // Verify if exists a user cookie
        var usu = usuarioService.getUsuarioCookie();
        if (!usu) {
            window.open(authUrl, '_self');
            return false;
        }
        return usu;
    },
    // getLoginEmail
    getLogin: (login, password) => {
        return new webix.promise((success, fail) => {
            var url = devConfig.getApiUrl() + "/api/comerciales/login";
            webix.ajax()
                .timeout(10000)
                .headers({
                    "Content-Type": "application/json"
                })
                .post(url, { login: login, password: password })
                .then(function (result) {
                    success(result.json());
                })
                .catch(function (inXhr) {
                    fail(inXhr);
                });
        });
    }
}