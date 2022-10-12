import Config from "./config";
import axios from "axios";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export const pureget = function(url) {
  return axios.get(Config.backEndUrl + url);
};

export const get = function(url, params) {
  return axios.get(Config.backEndUrl + url, {
    params: params
  });
};

export const pre_post = function(url, RSA_key) {
  const key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  const cipher_key = RSA_encrypt(key, RSA_key).toString("base64");
  const cipher_iv = RSA_encrypt(iv, RSA_key).toString("base64");
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
export const post = function(url, data) {
  /*let new_data = {};
  for (const key in data) {
    new_data[key] = AES_encrypt(data[key]);
  }
  const result = qs.stringify(new_data);*/
  const result = qs.stringify(data);
  return axios.post(Config.backEndUrl + url, result, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const del = function(url, params) {
  return axios.delete(Config.backEndUrl + url, {
    params: params
  });
};

export const put = function(url, data) {
  return axios.put(Config.backEndUrl + url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
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
  const key = Buffer.from(publickey, "utf-8");
  const text = Buffer.from(plaintext, "utf-8");
  return crypto.publicEncrypt(
    { key: key, padding: crypto.constants.RSA_PKCS1_PADDING },
    text
  );
};
