import { JetView } from "webix-jet";

var laId = 0;
export default class MyWindow extends JetView {
    config() {
        var _view = {
            view: "window", position: "center", head: "Window",
            body: {
                view: "form",
                id: "frmWidow",
                elements: [
                    {
                        view: "text", id: "local", name: "local", required: true,
                        label: "Ubicación", labelPosition: "top"
                    }
                ]
            }
        };
        return _view
    }
    showWindow(id) {
        console.log("Show window: ", id);
        this.getRoot().show();
        this.$$("local").setValue(id);
    }
}