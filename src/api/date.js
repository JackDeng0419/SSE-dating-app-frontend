import { post, get, pureget } from "@/common/ajax";

export const sendDate = dateForm => post("/send-date", dateForm);
export const cancelDate = dateForm => post("/cancel-date", dateForm);
export const dislikeUser = toUserId => post("/dislike-user", { toUserId });
export const normalUser = toUserId => post("/normal-user", { toUserId });

export const getLikeStatus = toUserId => {
  return get("/get-like-status", { toUserId });
};

export const getDateFromMe = () => {
  return pureget("/get-date-from-me");
};
