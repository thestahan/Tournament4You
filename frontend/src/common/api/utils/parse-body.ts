export const parseBody = (response: Response): Promise<any> => {
  const contentType = response.headers.get("Content-Type") || "";
  console.log(response);
  if (/text\/plain/.test(contentType)) {
    return response.text();
  } else if (
    /application\/json/.test(contentType) ||
    /application\/hal\+json/.test(contentType)
  ) {
    return response.json();
  } else {
    return Promise.resolve();
  }
};
