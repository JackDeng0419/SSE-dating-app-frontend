import { pureget, post } from "@/common/ajax";

export const get_basic_information = () => pureget("/profile/BI/get");

export const update_basic_information = form_data =>
  post("/profile/BI/update", form_data);

export const profile_gender = [
    {value: 1, label:"male"},
    {value: 2, label:"female"}
]

export const profile_age = []
for(let i=1;i<100;i++){
    profile_age.push({value: i, label:i.toString()})
}