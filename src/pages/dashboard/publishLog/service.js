import request from '@/utils/request';

export async function apiGetPublishLogList(params) {
  return request('/api/publish_log/v1/list/by_search', {
    method: 'POST',
    data: params,
  });
}

export async function apiGetProjectOption(params) {
  return request('/api/project/v1/list/by_example', {
    method: 'POST',
    data: params,
  });
}

export async function apiAddPublishLog(params) {
  const form = new FormData()
  form.append('attach', params.attach)
  form.append('projectId', params.projectId)
  form.append('name', params.name)
  return request('/api/publish_log/v1/add', {
    method: 'POST',
    data: form,
  });
}

export async function apiDeletePublishLog(params) {
  return request('/api/publish_log/v1/delete', {
    method: 'POST',
    data: params,
  });
}