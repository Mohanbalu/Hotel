export function successPayload(response) {
  if (!response) return { success: false, data: null };
  return { success: true, data: response.data, status: response.status };
}

export function unwrap(response) {
  if (!response) return null;
  return response.data;
}

export function isSuccess(response) {
  return response && response.status >= 200 && response.status < 300;
}

export default { successPayload, unwrap, isSuccess };
