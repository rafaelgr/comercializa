import { devConfig } from "../config/config";
export const maiJetService = {
    postMail: (email) => {
        return new webix.promise((success, fail) => {
            devConfig.getConfig()
                .then(conf => {
                    var url = "http://localhost:8089" + "/mailjet";
                    return webix.ajax()
                        .timeout(10000)
                        .headers({
                            "Content-Type": "application/json",
                        })
                        .post(url, email)

                })
                .then(function (result) {
                    console.log("RES: ", result);
                    success(result.json());
                })
                .catch(function (inXhr) {
                    console.log("ERR: ", inXhr);
                    fail(inXhr);
                });
        });
    }
};