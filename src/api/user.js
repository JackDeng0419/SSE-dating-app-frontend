import { post, pureget } from "@/common/ajax";
export const login = formdata => post("/login/login", formdata);

export const verify = code => post("/login/verify", { code: code });

export const signup = formdata => post("/login/signup", formdata);

export const getLoginStatus = () => {
  return pureget("/login/status");
};
