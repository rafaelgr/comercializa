import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import { serviciosService } from "../services/servicios_service";

var editButton = "<span class='onEdit webix_icon wxi-pencil'></span>";
var deleteButton = "<span class='onDelete webix_icon wxi-trash'></span>";
var currentIdDatatableView;
var currentRowDatatableView
var isNewRow = false;


export default class Servicios extends JetView {
    config() {
        const translate = this.app.getService("locale")._;
        var toolbarServicios = {
            view: "toolbar", padding: 3, elements: [
                { view: "icon", icon: "mdi mdi-home-assistant", width: 37, align: "left" },
                { view: "label", label: "Servicios" }
            ]
        }
        var pagerServicios = {
            cols: [
                {
                    view: "button", type: "form", icon: "wxi-plus", align: "left", hotkey: "Ctrl+F", value: "Solicitar un nuevo servicio", width: 300,
                    click: () => {
                        this.show('/top/serviciosForm?servicioId=0');
                    }
                },
                {},
                {
                    view: "pager", id: "mypager", css: { "text-align": "right" },
                    template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
                    size: 25,
                    group: 5
                }
            ]
        };
        var datatableServicios = {
            view: "datatable",
            id: "serviciosGrid",
            pager: "mypager",
            select: "row",
            columns: [
                { id: "fechaSolicitud", adjust: true, header: ["Fecha solicitud", { content: "textFilter" }], sort: "date", format: webix.Date.dateToStr("%d/%m/%Y") },
                { id: "descripcion", fillspace: true, header: ["Descripción del servicio solicitado", { content: "textFilter" }], sort: "string", editor: "text" },
                { id: "descripcion", fillspace: true, header: ["Descripción del servicio solicitado", { content: "textFilter" }], sort: "string", editor: "text" },
                { id: "direccion", fillspace: true, header: ["Dirección", { content: "textFilter" }], sort: "string", editor: "text" },
                { id: "actions", header: [{ text: translate("Acciones"), css: { "text-align": "center" } }], template: editButton , css: { "text-align": "center" } }
            ],
            onClick: {
                "onEdit": function (event, id, node) {
                    this.$scope.edit(id.row);
                }
            },
            editable: true,
            editaction: "dblclick",
            rules: {
                "nombre": webix.rules.isNotEmpty
            },
            on: {
                "onAfterEditStart": function (id) {
                    currentIdDatatableView = id.row;
                    currentRowDatatableView = this.data.pull[currentIdDatatableView];
                },
                "onAfterEditStop": function (state, editor, ignoreUpdate) {
                    var cIndex = this.getColumnIndex(editor.column);
                    var length = this.config.columns.length;
                    if (isNewRow && cIndex != length - 2) return false;
                    if (state.value != state.old) {
                        isNewRow = false;
                        if (!this.validate(currentIdDatatableView)) {
                            messageApi.errorMessage("Valores incorrectos");
                        } else {
                            currentRowDatatableView = this.data.pull[currentIdDatatableView];
                            // id is not part of the row object
                            delete currentRowDatatableView.id;
                            var data = currentRowDatatableView;
                            if (data.servicioId == 0) {
                                serviciosService.postServicio(usuarioService.getUsuarioCookie(), data)
                                    .then((result) => {
                                        this.$scope.load(result.servicioId);
                                        $$('serviciosGrid').editStop();
                                    })
                                    .catch((err) => {
                                        messageApi.errorMessageAjax(err);
                                    });
                            } else {
                                serviciosService.putServicio(usuarioService.getUsuarioCookie(), data)
                                    .then((result) => {
                                    })
                                    .catch((err) => {
                                        messageApi.errorMessageAjax(err);
                                    });
                            }
                        }
                    }
                },
            }
        }
        var _view = {
            rows: [
                toolbarServicios,
                pagerServicios,
                datatableServicios
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
            $$('serviciosGrid').remove(-1);
            return false;
        }, $$('serviciosGrid'));
        this.load(id);
    }
    load(id) {
        serviciosService.getServiciosComercial(usuarioService.getUsuarioCookie())
            .then((data) => {
                $$("serviciosGrid").clearAll();
                $$("serviciosGrid").parse(generalApi.prepareDataForDataTable("servicioId", data));
                if (id) {
                    $$("serviciosGrid").select(id);
                    $$("serviciosGrid").showItem(id);
                }
            })
            .catch((err) => {
                messageApi.errorMessageAjax(err);
            });
    }
    edit(id) {
        this.show('/top/serviciosForm?servicioId=' + id);
    }
}