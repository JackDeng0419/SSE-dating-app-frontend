import { post, pureget } from "@/common/ajax";
export const login = formdata => post("/login/login", formdata);

export const verify = code => post("/login/verify", { code: code });

export const signup = formdata => {
  return post("/login/signup", formdata);
}

export const apply_code = () => {
  return pureget("/login/code");
};
