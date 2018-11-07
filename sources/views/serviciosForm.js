import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { serviciosService } from "../services/servicios_service";
import { tiposProfesional, tiposProfesionalService } from "../services/tiposProfesional_service";
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
                                    view: "text", name: "fechaCreacion", disabled: true,
                                    label: "Fecha solicitud", labelPosition: "top"
                                },
                                {
                                    view: "text", name: "nombre", required: true, id: "firstField",
                                    label: translate("Nombre servicio"), labelPosition: "top"
                                }
                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "text", name: "cod", width: 100, required: true,
                                    label: translate("Código"), labelPosition: "top"
                                },
                                {
                                    view: "combo", id: "cmbPais", name: "paisId", required: true, options: {},
                                    label: translate("Pais relacionado"), labelPosition: "top"
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
        webix.delay(function () { $$("firstField").focus(); });
    }
    load(servicioId) {
        if (servicioId == 0) {
            this.loadPaises();
            return;
        }
        serviciosService.getServicio(usuarioService.getUsuarioCookie(), servicioId)
            .then((servicio) => {
                $$("frmServicios").setValues(servicio);
                this.loadPaises(servicio.paisId);
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
                var servicios = generalApi.prepareDataForCombo('paisId', 'nombre', rows);
                var list = $$("cmbPais").getPopup().getList();
                list.clearAll();
                list.parse(servicios);
                if (id) {
                    $$("cmbPais").setValue(paisId);
                    $$("cmbPais").refresh();
                }
                return;
            });
    }
}