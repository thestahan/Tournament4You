export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors: [string];
}

export const handleErrors = (response: ErrorResponse | any) => {
  if (!response?.statusCode) {
    return response;
  }

  switch (response.statusCode) {
    case 400:
      if (response.errors) {
        return Promise.reject({
          status: response.statusCode,
          message: response.errors[0],
        });
      }
      return Promise.reject({
        status: response.statusCode,
        message: response.message,
      });
    case 401:
      if (response.errors) {
        return Promise.reject({
          status: response.statusCode,
          message: response.errors[0],
        });
      }
      return Promise.reject({
        status: response.statusCode,
        message: response.message,
      });
    case 404:
      if (response.errors) {
        return Promise.reject({
          status: response.statusCode,
          message: response.errors[0],
        });
      }
      return Promise.reject({
        status: response.statusCode,
        message: response.message,
      });
    case 500:
      if (response.errors) {
        return Promise.reject({
          status: response.statusCode,
          message: response.errors[0],
        });
      }
      return Promise.reject({
        status: response.statusCode,
        message: response.message,
      });
    default:
      return response;
  }
};
