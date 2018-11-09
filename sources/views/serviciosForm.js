import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { tiposProfesionalService } from "../services/tiposProfesional_service";
import { serviciosService} from "../services/servicios_service";
import { clientesService} from "../services/clientes_service";
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
                                    view: "datepicker", id: "fechaServicio", name: "fechaCreacion", disabled: true, 
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
                            margin: 5, cols: [
                                { gravity: 5 },
                                { view: "button", label: translate("Cancelar"), click: this.cancel, hotkey: "esc" },
                                { view: "button", label: translate("Aceptar"), click: this.accept, type: "form", hotkey: "enter" }
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