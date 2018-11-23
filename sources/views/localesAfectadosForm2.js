import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { tiposProfesionalService } from "../services/tiposProfesional_service";
import { serviciosService } from "../services/servicios_service";
import { clientesService } from "../services/clientes_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import {WindowsView} from './localesAfectadosForm';

var diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
]

var servicioId = 0;

export default class LocalesAfectadosForm extends JetView {
    config() {
        const translate = this.app.getService("locale")._;
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
        }
        const _view = {
            view: "window", position: "center", head: "Window",
            body: _view1
        }
        return _view;
    }
    showWindow() {
        this.getRoot().show();
    }
    init(view, url) {
        // usuarioService.checkLoggedUser();
        // if (url[0].params.servicioId) {
        //     servicioId = url[0].params.servicioId;
        // }
        // this.load(servicioId);
        // webix.delay(function () { $$("cmbTipoProfesional").focus(); });
        // this.$$("cmbClientes").attachEvent("onChange", (newv, oldv) => {
        //     this.loadClienteData(newv);
        // });
        //WindowsView class
    }
    load(servicioId) {
        // if (servicioId == 0) {
        //     this.loadTiposProfesional();
        //     this.loadClientesAgente();
        //     $$("fechaServicio").setValue(new Date());
        //     this.show("./locales_afectados?servicioId=" + servicioId);
        //     return;
        // }
        // serviciosService.getServicio(usuarioService.getUsuarioCookie(), servicioId)
        //     .then((servicio) => {
        //         servicio.fechaCreacion = new Date(servicio.fechaCreacion);
        //         $$("frmLocalesAfectados").setValues(servicio);
        //         this.loadTiposProfesional(servicio.tipoProfesionalId);
        //         this.loadClientesAgente(servicio.clienteId);
        //         this.show("./localesAfectados?servicioId=" + servicioId);
        //     })
        //     .catch((err) => {
        //         messageApi.errorMessageAjax(err);
        //     });
    }
    cancel() {
        // this.$scope.show('/top/servicios');
    }
    accept() {
        // const translate = this.$scope.app.getService("locale")._;
        // if (!$$("frmLocalesAfectados").validate()) {
        //     messageApi.errorMessage("Debe rellenar los campos correctamente");
        //     return;
        // }
        // var data = $$("frmLocalesAfectados").getValues();
        // if (servicioId == 0) {
        //     data.servicioId = 0;
        //     data.agenteId = usuarioService.getUsuarioCookie().comercialId;
        //     serviciosService.postServicio(usuarioService.getUsuarioCookie(), data)
        //         .then((result) => {
        //             this.$scope.show('/top/servicios?servicioId=' + result.servicioId);
        //         })
        //         .catch((err) => {
        //             messageApi.errorMessageAjax(err);
        //         });
        // } else {
        //     serviciosService.putServicio(usuarioService.getUsuarioCookie(), data)
        //         .then(() => {
        //             this.$scope.show('/top/servicios?servicioId=' + data.servicioId);
        //         })
        //         .catch((err) => {
        //             messageApi.errorMessageAjax(err);
        //         });
        // }
    }
    loadTiposProfesional(tipoProfesionalId) {
        // tiposProfesionalService.getTiposProfesional(usuarioService.getUsuarioCookie())
        //     .then(rows => {
        //         var servicios = generalApi.prepareDataForCombo('tipoProfesionalId', 'nombre', rows);
        //         var list = $$("cmbTipoProfesional").getPopup().getList();
        //         list.clearAll();
        //         list.parse(servicios);
        //         if (tipoProfesionalId) {
        //             $$("cmbTipoProfesional").setValue(tipoProfesionalId);
        //             $$("cmbTipoProfesional").refresh();
        //         }
        //         return;
        //     });
    }
    loadClientesAgente(clienteId) {
        // clientesService.getClientesAgente(usuarioService.getUsuarioCookie(), usuarioService.getUsuarioCookie().comercialId)
        //     .then(rows => {
        //         var servicios = generalApi.prepareDataForCombo('clienteId', 'nombre', rows);
        //         var list = $$("cmbClientes").getPopup().getList();
        //         list.clearAll();
        //         list.parse(servicios);
        //         if (clienteId) {
        //             $$("cmbClientes").setValue(clienteId);
        //             $$("cmbClientes").refresh();
        //         }
        //         return;
        //     });
    }
    loadClienteData(clienteId) {
        // clientesService.getCliente(usuarioService.getUsuarioCookie(), clienteId)
        //     .then(rows => {
        //         $$("calle").setValue(rows.direccion);
        //         $$("poblacion").setValue(rows.poblacion2);
        //         $$("codPostal").setValue(rows.codPostal);
        //         $$("provincia").setValue(rows.provincia);
        //         return;
        //     });
    }

}