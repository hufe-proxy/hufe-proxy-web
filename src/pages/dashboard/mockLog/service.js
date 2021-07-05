import request from '@/utils/request';

export async function apiGetMockList(params) {
  return request('/api/mock_log/v1/list/by_search', {
    method: 'POST',
    data: params,
  });
}

export async function apiAddMock(params) {
  return request('/api/mock_log/v1/add', {
    method: 'POST',
    data: params,
  });
}

export async function apiDeleteMock(params) {
  return request('/api/mock_log/v1/delete', {
    method: 'POST',
    data: params,
  });
}

export async function apiUpdateMock(params) {
  return request('/api/mock_log/v1/update', {
    method: 'POST',
    data: params,
  });
}