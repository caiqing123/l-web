import { request } from '@/utils/request';

export default {

  /**
   * 获取验证码
   * @returns
   */
  getCaptch() {
    return request({
      url: 'captcha/api',
      method: 'get',
    });
  },

  /**
   * 用户登录
   * @param {object} params
   * @returns
   */
  login(params = {}) {
    return request({
      url: 'api/login',
      method: 'post',
      data: params,
    });
  },

  /**
   * 用户退出
   * @param {object} params
   * @returns
   */
  logout(params = {}) {
    return request({
      url: 'api/logout',
      method: 'delete',
      data: params,
    });
  },

  /**
   * 获取登录用户信息
   * @param {object} params
   * @returns
   */
  getInfo(params = {}) {
    return request({
      url: 'api/user/getInfo',
      method: 'get',
      data: params,
    });
  },
};
