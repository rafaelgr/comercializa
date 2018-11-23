import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import { serviciosService } from "../services/servicios_service";
import { localesAfectadosService } from "../services/locales_afectados_service";
import LocalesAfectadosForm from './localesAfectadosForm';

var editButton = "<span class='onEdit webix_icon wxi-pencil'></span>";
var deleteButton = "<span class='onDelete webix_icon wxi-trash'></span>";
var currentIdDatatableView;
var currentRowDatatableView
var isNewRow = false;

var vServicioId = 0;

export default class LocalesAfectados extends JetView {
    config() {
        const translate = this.app.getService("locale")._;
        var toolbarLocalesAfectados = {
            view: "toolbar", padding: 3, elements: [
                { view: "icon", icon: "mdi mdi-office-building", width: 37, align: "left" },
                { view: "label", label: "Locales afectados" }
            ]
        }
        var pagerLocalesAfectados = {
            cols: [
                {
                    view: "button", type: "form", icon: "wxi-plus", align: "left", hotkey: "Ctrl+F", value: "Agregar un local", width: 300,
                    click: () => {
                        // console.log('Mandamos....');
                        // this.show('/top/serviciosForm?servicioId=3/localesAfectados?servicioId=3&new=1');
                        // this.win2.showWindow(0);
                        // Controlar si no se ha dado de alta todavía el servicio
                        if (vServicioId == 0) {
                            // Hay que dar de alta el servicio
                            if (!$$("frmServicios").validate()) {
                                messageApi.errorMessage("Debe rellenar los campos correctamente");
                                return;
                            }
                            var data = $$("frmServicios").getValues();
                            data.servicioId = 0;
                            data.agenteId = usuarioService.getUsuarioCookie().comercialId;
                            console.log("Antes del alta: ", data);
                            serviciosService.postServicio(usuarioService.getUsuarioCookie(), data)
                                .then((result) => {
                                    this.show('/top/serviciosForm?servicioId=' + result.servicioId + '/localesAfectados?servicioId' + result.servicioId + '&new=1');
                                    this.win2.showWindow(0);
                                })
                                .catch((err) => {
                                    messageApi.errorMessageAjax(err);
                                });
                        } else {
                            this.win2.showWindow(0);
                        }
                    }
                },
                {},
                {
                    view: "pager", id: "pagerLocalesAfectados", css: { "text-align": "right" },
                    template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
                    size: 25,
                    group: 5
                }
            ]
        };
        var datatableLocalesAfectados = {
            view: "datatable",
            id: "localesAfectadosGrid",
            pager: "pagerLocalesAfectados",
            select: "row",
            rightSplit: 1,
            columns: [
                { id: "local", fillspace: true, header: ["Local", { content: "textFilter" }], sort: "string" },
                { id: "personaContacto", fillspace: true, header: ["Persona contacto", { content: "textFilter" }], sort: "string" },
                { id: "telefono1", fillspace: true, header: ["Telefono (1)", { content: "textFilter" }], sort: "string" },
                { id: "correoElectronico", fillspace: true, header: ["Correo", { content: "textFilter" }], sort: "string" },
                { id: "actions", header: [{ text: "Acciones", css: { "text-align": "center" } }], template: editButton, css: { "text-align": "center" } }
            ],
            onClick: {
                "onEdit": function (event, id, node) {
                    this.$scope.edit(id.row);
                }
            }
        }
        var _view = {
            rows: [
                toolbarLocalesAfectados,
                pagerLocalesAfectados,
                datatableLocalesAfectados
            ]
        }
        return _view;
    }
    init(view, url) {
        usuarioService.checkLoggedUser();
        var id = null;
        if (url[0].params.servicioId) {
            id = url[0].params.servicioId;
        }
        webix.UIManager.addHotKey("Esc", function () {
            $$('localesAfectadosGrid').remove(-1);
            return false;
        }, $$('localesAfectadosGrid'));
        vServicioId = id;
        if (id != 0) this.load(id);
        //WindowsView class
        this.win2 = this.ui(LocalesAfectadosForm);
    }
    urlChange(view, url){
        if (url[0].params.servicioId) {
            vServicioId = url[0].params.servicioId;
        }
    }
    load(id) {
        console.log("Servicio pasado :", id);
        if (id == 0) return;
        localesAfectadosService.getLocalesAfectadosServicio(usuarioService.getUsuarioCookie(), id)
            .then((data) => {
                $$("localesAfectadosGrid").clearAll();
                if (data) $$("localesAfectadosGrid").parse(generalApi.prepareDataForDataTable("localAfectadoId", data));
            })
            .catch((err) => {
                messageApi.errorMessageAjax(err);
            });
    }
    edit(id) {
        this.win2.showWindow(id);
    }
}