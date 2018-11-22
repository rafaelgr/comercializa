import { JetView } from "webix-jet";

export default class TestSub extends JetView {
    config(){
        var _view = {
            template: 'This is sub'
        };
        return _view;
    }
    caller(){
        alert("TESTS");
    }
}