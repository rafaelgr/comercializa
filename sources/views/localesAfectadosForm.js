import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import { localesAfectadosService } from "../services/locales_afectados_service";

let localAfectadoId = 0;

var diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
]
export default class LocalesAfectadosForm extends JetView {
    config() {
        const _view1 = {
            view: "layout",
            id: "localesAfectadosForm",
            rows: [
                {
                    view: "toolbar", padding: 3, elements: [
                        { view: "icon", icon: "mdi mdi-office-building", width: 37, align: "left" },
                        { view: "label", label: "Local afectado" }
                    ]
                },
                {
                    view: "form",

                    id: "frmLocalesAfectados",
                    elements: [
                        {
                            cols: [
                                {
                                    view: "text", id: "local", name: "local", required: true,
                                    label: "Ubicación", labelPosition: "top"
                                }
                            ]
                        },
                        {
                            rows: [
                                { template: "Persona de contacto", type: "section" },
                                {
                                    cols: [
                                        {
                                            view: "text", id: "personaContacto", name: "personaContacto", required: true,
                                            label: "Nombre", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "cargo", name: "cargo",
                                            label: "Cargo", labelPosition: "top"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            rows: [
                                { template: "Horario de atención", type: "section" },
                                {
                                    cols: [
                                        {
                                            view: "text", id: "telefono1", name: "telefono1", required: true,
                                            label: "Teléfono (1)", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "telefono2", name: "telefono2",
                                            label: "Teléfono (2)", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "correoElectronico", name: "telefono2",
                                            label: "Correo electrónico", labelPosition: "top"
                                        }
                                    ]
                                },
                                {
                                    cols: [
                                        {
                                            view: "text", id: "deHoraAtencion", name: "deHoraAtencion", required: true,
                                            label: "Mañanas desde", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "aHoraAtencion", name: "aHoraAtencion",
                                            label: "hasta", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "deHoraAtencion2", name: "deHoraAtencion2", required: true,
                                            label: "Tardes desde", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "aHoraAtencion2", name: "aHoraAtencion2",
                                            label: "hasta", labelPosition: "top"
                                        },
                                        {
                                            view: "combo", id: "deDiaSemana", name: "deDiaSemana", required: true, options: diasSemana,
                                            label: "De", labelPosition: "top"
                                        },
                                        {
                                            view: "combo", id: "aDiaSemana", name: "aDiaSemana", required: true, options: diasSemana,
                                            label: "A", labelPosition: "top"
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            cols: [
                                {
                                    view: "textarea", id: "comentarios", name: "comentarios", required: true,
                                    label: "Comentarios", labelPosition: "top"
                                }
                            ]
                        },

                        {
                            margin: 5, cols: [
                                { gravity: 5 },
                                { view: "button", label: "Cancelar", click: this.cancel, hotkey: "esc" },
                                { view: "button", label: "Aceptar", click: this.accept, type: "form", hotkey: "enter" }
                            ]
                        }
                    ]
                }
            ]
        };
        var _view = {
            view: "window",
            id: "w2",
            position: "center", move: true, resize: true,
            width: 800,
            head: {
                view: "toolbar", cols: [
                    {},
                    {
                        view: "icon", icon: "mdi mdi-close", click: () => {
                            $$('w2').hide();
                        }
                    }
                ]
            }, modal: true,
            body: _view1
        };
        return _view
    }
    showWindow(id) {
        this.getRoot().show();
        localAfectadoId = id;
        if (localAfectadoId != 0) {
            localesAfectadosService.getLocalAfectado(usuarioService.getUsuarioCookie(), localAfectadoId)
                .then((localAfectado) => {
                    $$("frmLocalesAfectados").setValues(localAfectado);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        }

    }
    cancel(){
        var mItem = $$('localesAfectadosGrid').getItem(localAfectadoId);
        console.log("MITEM: ", mItem);
        if (mItem) {
            mItem.local = "TE TEOQUÉ";
        }
        console.log("MITEM2: ", mItem);
        $$('localesAfectadosGrid').refresh();
        $$('w2').hide();
    }
    accept(){
        var data = $$("frmLocalesAfectados").getValues();
        console.log('DATA LOCAL: ', data);
        if (localAfectadoId == 0){

        } else {

        }
    }
}