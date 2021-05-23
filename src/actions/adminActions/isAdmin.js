import { CHANGE_IS_ADMIN_STATUS } from "../../constant";

export const changeIsAdminStatus = (status) => ({
  type: CHANGE_IS_ADMIN_STATUS,
  payload: status,
});
