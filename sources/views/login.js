import { JetView } from "webix-jet";

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
                                            view: "text", name: "login",
                                            label: "Usuario", labelPosition: "top"
                                        },
                                        {
                                            view: "text", name: "password",
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
}