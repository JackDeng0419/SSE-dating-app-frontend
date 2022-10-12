import crypto from "crypto";


export const createToken = function(){
    if(sessionStorage.getItem("AES_key") === null) {
        sessionStorage.setItem("AES_key", crypto.randomBytes(16).toString("base64"));
        sessionStorage.setItem("AES_iv", crypto.randomBytes(12).toString("base64"));
    }
    return true;
}
