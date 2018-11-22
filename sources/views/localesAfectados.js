import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";
import { generalApi } from "../utilities/general";
import { serviciosService } from "../services/servicios_service";
import { localesAfectadosService } from "../services/locales_afectados_service";
import MyWindow from './widow';

var editButton = "<span class='onEdit webix_icon wxi-pencil'></span>";
var deleteButton = "<span class='onDelete webix_icon wxi-trash'></span>";
var currentIdDatatableView;
var currentRowDatatableView
var isNewRow = false;


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
                        //this.show('/top/serviciosForm?servicioId=0');
                        this.win2.showWindow(new Date());
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
                                        $$('localesAfectadosGrid').editStop();
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
        console.log("SERVICIO PASADO: ", id);
        if (id != 0) this.load(id);
        //WindowsView class
        this.win2 = this.ui(MyWindow);
    }
    load(id) {
        localesAfectadosService.getLocalesAfectadosServicio(usuarioService.getUsuarioCookie(), id)
            .then((data) => {
                $$("localesAfectadosGrid").clearAll();
                $$("localesAfectadosGrid").parse(generalApi.prepareDataForDataTable("localAfectadoId", data));
                // if (id) {
                //     $$("localesAfectadosGrid").select(id);
                //     $$("localesAfectadosGrid").showItem(id);
                // }
            })
            .catch((err) => {
                messageApi.errorMessageAjax(err);
            });
    }
    edit(id) {
        this.show('/top/serviciosForm?servicioId=' + id);
    }
}