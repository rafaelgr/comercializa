import { JetView } from "webix-jet";

var laId = 0;
export default class MyWindow extends JetView {
    config() {
        var _view = {
            view: "window",
            id: "w2",
            position: "center", move: true, resize: true,
            width: 800,
            head: {
                view: "toolbar", cols: [
                    { view: "label", label: "This window can be closed" },
                    { view: "button", label: 'Close Me', width: 100, align: 'right', click: "$$('w2').hide();" },
                    {
                        view: "icon", icon: "mdi mdi-close", click: () => {
                            $$('w2').hide();
                        }
                    }
                ]
            }, modal: true,
            body: {
                view: "form",
                id: "frmWidow",
                elements: [
                    {
                        cols: [
                            {
                                view: "text", id: "local", name: "local", required: true,
                                label: "Ubicación", labelPosition: "top"
                            },
                            {
                                view: "text", id: "local2", name: "local2", required: true,
                                label: "Otra", labelPosition: "top"
                            }

                        ]
                    },
                    {
                        template: "Another row"
                    }
                ]
            }
        };
        return _view
    }
    showWindow(id) {
        this.getRoot().show();
        this.$$("local").setValue(id);
    }
}