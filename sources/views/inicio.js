import { JetView } from "webix-jet";
import { usuarioService } from "../services/usuario_service";
import { messageApi } from "../utilities/messages";

export default class Inicio extends JetView {
    config() {
		const translate = this.app.getService("locale")._;
        return {
            template: `<h1>Bienvenido al espacio para colaboradores de Comercializa</h1>
            <p>Dispone de un menú a su izquierda con el que puede acceder a las diferentes opciones de la aplicación</p>
            `
        }
    }
}
