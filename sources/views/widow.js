import {JetView} from "webix-jet";


export default class MyWindow extends JetView {
	config(){
		return {
			view:"popup",
			top:200, left:300,
			body:{ template:"Text 2 (fixed position)" }
		};
	}
	showWindow(){
		this.getRoot().show();
	}
}