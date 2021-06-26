import request from '@/utils/request';
export async function apiGetProjectList(params) {
  return request('/api/project/v1/list/by_search', {
    method: 'POST',
    data: params,
  });
}

export async function apiAddProject(params) {
  return request('/api/project/v1/add', {
    method: 'POST',
    data: params,
  });
}

export async function apiDeleteProject(params) {
  return request('/api/project/v1/delete', {
    method: 'POST',
    data: params,
  });
}

export async function apiUpdateProject(params) {
  return request('/api/project/v1/update', {
    method: 'POST',
    data: params,
  });
}