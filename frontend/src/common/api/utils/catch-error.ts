export const catchError = (response: { ok: boolean }) => {
  // if (!response.ok) throw response;
  return response;
};
