import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
export default class Login extends JetView {
    config() {
        var _view = {
            view: "layout",
            css: "loginBack",
            rows: [
                {

                },
                {
                    cols: [
                        {

                        },
                        {
                            rows: [
                                {
                                    view: "form", width: 300, css: "round-border",
                                    id: "frmLogin",
                                    elements: [
                                        {
                                            view: "label", height: 100, align: "center",
                                            label: "<img src='assets/img/logo.png'/>"
                                        },
                                        {
                                            view: "text", name: "login", required: true,
                                            label: "Usuario", labelPosition: "top"
                                        },
                                        {
                                            view: "text", type: "password", name: "password", required: true,
                                            label: "Contraseña", labelPosition: "top"
                                        },
                                        {
                                            margin: 5, cols: [
                                                { view: "button", label: "Cancelar", click: this.cancel, hotkey: "esc" },
                                                { view: "button", label: "Aceptar", click: this.accept, type: "form", hotkey: "enter" }
                                            ]
                                        }
                                    ]
                                }
                            ]

                        },
                        {

                        }
                    ]
                },
                {
                }
            ]
        }
        return _view;
    }
    init() {

    }
    cancel() {

    }
    accept() {
        if (!$$("frmLogin").validate()) {
            messageApi.errorMessage("Debe rellenar los campos correctamente");
            return;
        }
        var data = $$("frmLogin").getValues();
        usuarioService.getLogin(data.login, data.password)
            .then(result => {
                let usuario = result;
                delete usuario.password;
                usuario.apiKey = "X2X";
                usuarioService.setUsuarioCookie(usuario);
                this.$scope.show('top/inicio');
            })
            .catch(err => {
                messageApi.errorMessageAjax(err);
            });
    }
}