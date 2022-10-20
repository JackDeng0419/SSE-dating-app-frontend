import { pureget } from "@/common/ajax";

export const getUserList = () => {
  return pureget("/search-mate");
};
