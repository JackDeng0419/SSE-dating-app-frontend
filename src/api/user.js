import { post, pureget } from "@/common/ajax";
export const match = formdata => post("/login/check", formdata);

export const login = code => post("/login/login", { code: code });

export const signup = formdata => post("/login/signup", formdata);

export const getLoginStatus = () => {
  return pureget("/login/status");
};
