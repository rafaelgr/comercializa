import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import { localesAfectadosService } from "../services/locales_afectados_service";

let localAfectadoId = 0;
let mServicioId = 0;

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
                                            view: "text", id: "correoElectronico", name: "correoElectronico",
                                            label: "Correo electrónico", labelPosition: "top"
                                        }
                                    ]
                                },
                                {
                                    cols: [
                                        {
                                            view: "text", id: "deHoraAtencion", name: "deHoraAtencion", 
                                            label: "Mañanas desde", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "aHoraAtencion", name: "aHoraAtencion",
                                            label: "hasta", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "deHoraAtencion2", name: "deHoraAtencion2", 
                                            label: "Tardes desde", labelPosition: "top"
                                        },
                                        {
                                            view: "text", id: "aHoraAtencion2", name: "aHoraAtencion2",
                                            label: "hasta", labelPosition: "top"
                                        },
                                        {
                                            view: "combo", id: "deDiaSemana", name: "deDiaSemana",  options: diasSemana,
                                            label: "De", labelPosition: "top"
                                        },
                                        {
                                            view: "combo", id: "aDiaSemana", name: "aDiaSemana",  options: diasSemana,
                                            label: "A", labelPosition: "top"
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            cols: [
                                {
                                    view: "textarea", id: "comentarios", name: "comentarios", 
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
    showWindow(servicioId, id) {
        this.getRoot().show();
        localAfectadoId = id;
        mServicioId = servicioId;
        if (localAfectadoId != 0) {
            localesAfectadosService.getLocalAfectado(usuarioService.getUsuarioCookie(), localAfectadoId)
                .then((localAfectado) => {
                    $$("frmLocalesAfectados").setValues(localAfectado);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        } else {
            $$("frmLocalesAfectados").setValues({});
        }
    }
    cancel() {
        $$('w2').hide();
    }
    accept() {
        if (!$$("frmLocalesAfectados").validate()) {
            messageApi.errorMessage("Debe rellenar los campos correctamente");
            return;
        }
        var data = $$("frmLocalesAfectados").getValues();
        if (localAfectadoId == 0) {
            data.localAfectadoId = 0;
            data.servicioId = mServicioId;
            localesAfectadosService.postLocalAfectado(usuarioService.getUsuarioCookie(), data)
                .then((result) => {
                    this.$scope.refreshServicioFormGrid(mServicioId, result.localAfectadoId);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        } else {
            localesAfectadosService.putLocalAfectado(usuarioService.getUsuarioCookie(), data)
                .then((result) => {
                    this.$scope.refreshServicioFormGrid(mServicioId, result.localAfectadoId);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        }
    }
    refreshServicioFormGrid(servicioId, localAfectadoId) {
        localesAfectadosService.getLocalesAfectadosServicio(usuarioService.getUsuarioCookie(), servicioId)
            .then((data) => {
                $$("localesAfectadosGrid").clearAll();
                if (data) $$("localesAfectadosGrid").parse(generalApi.prepareDataForDataTable("localAfectadoId", data));
                if (localAfectadoId) {
                    $$("localesAfectadosGrid").select(localAfectadoId);
                    $$("localesAfectadosGrid").showItem(localAfectadoId);
                }
                $$('w2').hide();
            })
            .catch((err) => {
                messageApi.errorMessageAjax(err);
            });
    }
}