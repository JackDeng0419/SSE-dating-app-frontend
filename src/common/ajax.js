import Config from "./config";
import axios from "axios";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
import router from "../router";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => {
    if (
      response.config.url !== Config.backEndUrl + "/login/RSA" &&
      response.config.url !== Config.backEndUrl + "/login/AES"
    ) {
      if (response.data.data !== null) {
        const plaintext = AES_decrypt(response.data.data);
        response.data.data = JSON.parse(plaintext);
      }
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export const pureget = async function(url) {
  await check();
  return axios.get(Config.backEndUrl + url);
};

export const get = async function(url, params) {
  await check();
  return axios.get(Config.backEndUrl + url, {
    params: params
  });
};

export const post = async function(url, data) {
  await check();
  let new_data = JSON.stringify(data);
  const result = { data: AES_encrypt(new_data) };
  return axios.post(Config.backEndUrl + url, result, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const del = async function(url, params) {
  await check();
  return axios.delete(Config.backEndUrl + url, {
    params: params
  });
};

export const put = async function(url, data) {
  await check();
  return axios.put(Config.backEndUrl + url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const pre_get = function(url) {
  return axios.get(Config.backEndUrl + url);
};

export const pre_post = function(url, RSA_key) {
  const plain_key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const plain_iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  const publickey = Buffer.from(RSA_key, "utf8");
  const cipher_key = RSA_encrypt(plain_key, publickey).toString("base64");
  const cipher_iv = RSA_encrypt(plain_iv, publickey).toString("base64");
  let formData = {
    key: cipher_key,
    iv: cipher_iv
  };
  return axios.post(Config.backEndUrl + url, qs.stringify(formData), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const check = async function() {
  if (sessionStorage.getItem("AES_key") === null) {
    await sessionStorage.setItem(
      "AES_key",
      crypto.randomBytes(16).toString("base64")
    );
    await sessionStorage.setItem(
      "AES_iv",
      crypto.randomBytes(12).toString("base64")
    );
    await pre_get("/login/RSA").then(async res => {
      const RSA_key = res.data.data.public_key;
      await pre_post("/login/AES", RSA_key).then(async () => {
        await pre_get("/login/status").then(res => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            sessionStorage.setItem("userid", res.data.data._uid);
            sessionStorage.setItem("username", res.data.data.username);
            sessionStorage.setItem(
              "mobile_number",
              res.data.data.mobile_number
            );
            sessionStorage.setItem("email", res.data.data.email);
          } else {
            router.push("/login");
          }
        });
      });
    });
  } else {
    if (sessionStorage.getItem("userid") === null) {
      console.log("userid", sessionStorage.getItem("userid"));
      pre_get("/login/status").then(
        res => {
          sessionStorage.setItem("userid", res.data._uid);
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("mobile_number", res.data.mobile_number);
          sessionStorage.setItem("email", res.data.email);
        },
        () => {
          router.push("/login");
        }
      );
    }
    console.log("userid", sessionStorage.getItem("userid"));
  }
};

export const AES_decrypt = function(ciphertext) {
  const key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  try {
    const new_ciphertext = Buffer.from(ciphertext, "base64");
    if (ciphertext === new_ciphertext) alert(1);
    const cipher = crypto.createDecipheriv("aes-128-gcm", key, iv);
    const msg = cipher.update(
      new_ciphertext.slice(12, new_ciphertext.length - 16)
    );
    return msg.toString("utf8");
  } catch (e) {
    console.log("Decrypt is error", e);
    return null;
  }
};

export const AES_encrypt = function(plaintext) {
  const key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  try {
    const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
    let enc = cipher.update(plaintext, "utf8", "hex");
    enc += cipher.final("hex");
    const tags = cipher.getAuthTag();
    enc = Buffer.from(enc, "hex");
    const totalLength = iv.length + enc.length + tags.length;
    return Buffer.concat([iv, enc, tags], totalLength).toString("base64");
  } catch (e) {
    console.log("Encrypt is error", e);
    return null;
  }
};

export const RSA_encrypt = function(plaintext, publickey) {
  return crypto.publicEncrypt(
    { key: publickey, padding: crypto.constants.RSA_PKCS1_PADDING },
    plaintext
  );
};
