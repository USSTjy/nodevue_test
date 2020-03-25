import * as API from '../axios';

export default {
  // 登录接口
  loginIn: (params) => API.POST('/login', params),
  // 注册接口
  registerIn: (params) => API.POST('/register', params),
  // 会议日历
  GetMeetingCalander: () => API.GET('api/Booking/GetMeetingCalander'),
  // 获取会议详细
  GetMeetingDetailByID: (ID) => API.POST('api/Booking/GetMeetingDetailByID', ID),
};
