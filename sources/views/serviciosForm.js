import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { tiposProfesionalService } from "../services/tiposProfesional_service";
import { serviciosService } from "../services/servicios_service";
import { clientesService } from "../services/clientes_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";

var servicioId = 0;

export default class ServiciosForm extends JetView {
    config() {
        const translate = this.app.getService("locale")._;
        const _view = {
            view: "layout",
            id: "serviciosForm",
            rows: [
                {
                    view: "toolbar", padding: 3, elements: [
                        { view: "icon", icon: "mdi mdi-home-assistant", width: 37, align: "left" },
                        { view: "label", label: "Servicios" }
                    ]
                },
                {
                    view: "form",

                    id: "frmServicios",
                    elements: [
                        {
                            cols: [
                                {
                                    view: "datepicker", id: "fechaServicio", name: "fechaCreacion", disabled: true, width: 200,
                                    label: "Fecha solicitud", labelPosition: "top"
                                },
                                {
                                    view: "combo", id: "cmbTipoProfesional", name: "tipoProfesionalId", required: true, options: {},
                                    label: "Tipo profesional", labelPosition: "top"
                                },
                                {
                                    view: "combo", id: "cmbClientes", name: "clienteId", required: true, options: {},
                                    label: "Cliente", labelPosition: "top"
                                }

                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "text", id: "calle", name: "calle",
                                    label: "Calle", labelPosition: "top"
                                },
                                {
                                    view: "text", id: "numero", name: "numero", width: 100,
                                    label: "Número", labelPosition: "top"
                                },
                                {
                                    view: "text", id: "poblacion", name: "poblacion",
                                    label: "Población", labelPosition: "top"
                                },
                                {
                                    view: "text", id: "codPostal", name: "codPostal", width: 100,
                                    label: "Cod. Postal", labelPosition: "top"
                                },
                                {
                                    view: "text", id: "provincia", name: "provincia",
                                    label: "Provincia", labelPosition: "top"
                                }
                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "textarea", id: "descripcion", name: "descripcion",
                                    label: "Descripción de la avería", labelPosition: "top"
                                }
                            ]

                        },
                        {
                            view: "checkbox", id: "autorizacion", name: "autorizacion", label: `Autorizo`
                        },
                        {
                            borderless: true, template: `Autoriza la reparación de la avería, ajustando los precios a tarifas, 
                            el importe no superará 400€ +IVA, de lo contrario se realizará la mínima intervención para evitar daños mayores, 
                            no se realizará ningún trabajo que supere este importe sin la aceptación previa del presupuesto.`
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
        return _view;
    }
    init(view, url) {
        usuarioService.checkLoggedUser();
        if (url[0].params.servicioId) {
            servicioId = url[0].params.servicioId;
        }
        this.load(servicioId);
        webix.delay(function () { $$("cmbTipoProfesional").focus(); });
    }
    load(servicioId) {
        if (servicioId == 0) {
            this.loadTiposProfesional();
            this.loadClientesAgente();
            $$("fechaServicio").setValue(new Date());
            return;
        }
        serviciosService.getServicio(usuarioService.getUsuarioCookie(), servicioId)
            .then((servicio) => {
                servicio.fechaCreacion = new Date(servicio.fechaCreacion);
                $$("frmServicios").setValues(servicio);
                this.loadTiposProfesional(servicio.tipoProfesionalId);
                this.loadClientesAgente(servicio.clienteId);
            })
            .catch((err) => {
                messageApi.errorMessageAjax(err);
            });
    }
    cancel() {
        this.$scope.show('/top/servicios');
    }
    accept() {
        const translate = this.$scope.app.getService("locale")._;
        if (!$$("frmServicios").validate()) {
            messageApi.errorMessage(translate("Debe rellenar los campos correctamente"));
            return;
        }
        var data = $$("frmServicios").getValues();
        if (servicioId == 0) {
            data.servicioId = 0;
            serviciosService.postServicio(usuarioService.getUsuarioCookie(), data)
                .then((result) => {
                    this.$scope.show('/top/servicios?servicioId=' + result.servicioId);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        } else {
            serviciosService.putServicio(usuarioService.getUsuarioCookie(), data)
                .then(() => {
                    this.$scope.show('/top/servicios?servicioId=' + data.servicioId);
                })
                .catch((err) => {
                    messageApi.errorMessageAjax(err);
                });
        }
    }
    loadTiposProfesional(tipoProfesionalId) {
        tiposProfesionalService.getTiposProfesional(usuarioService.getUsuarioCookie())
            .then(rows => {
                var servicios = generalApi.prepareDataForCombo('tipoProfesionalId', 'nombre', rows);
                var list = $$("cmbTipoProfesional").getPopup().getList();
                list.clearAll();
                list.parse(servicios);
                if (tipoProfesionalId) {
                    $$("cmbTipoProfesional").setValue(tipoProfesionalId);
                    $$("cmbTipoProfesional").refresh();
                }
                return;
            });
    }
    loadClientesAgente(clienteId) {
        clientesService.getClientesAgente(usuarioService.getUsuarioCookie(), usuarioService.getUsuarioCookie().comercialId)
            .then(rows => {
                var servicios = generalApi.prepareDataForCombo('clienteId', 'nombre', rows);
                var list = $$("cmbClientes").getPopup().getList();
                list.clearAll();
                list.parse(servicios);
                if (clienteId) {
                    $$("cmbClientes").setValue(clienteId);
                    $$("cmbClientes").refresh();
                }
                return;
            });
    }
}