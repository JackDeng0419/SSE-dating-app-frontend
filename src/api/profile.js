import { pureget, post } from "@/common/ajax";

export const get_basic_information = () => pureget("/profile/basic-info/get");
export const get_looks = () => pureget("/profile/looks/get");

export const update_basic_information = form_data =>
  post("/profile/basic-info/update", form_data);

export const update_looks = form_data =>
  post("/profile/looks/update", form_data);

export const update_hobbies = form_data =>
  post("/profile/hobbies/update", form_data);
