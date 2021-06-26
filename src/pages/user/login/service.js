import request from '@/utils/request';
export async function apiLogin(params) {
  return request('/api/common/v1/login', {
    method: 'POST',
    data: params,
  });
}
