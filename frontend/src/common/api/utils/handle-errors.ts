export const handleErrors = (response: {
  errors: string[];
  statusCode: number;
  message: string;
}) => {
  console.log(response);
  switch (response.statusCode) {
    case 400:
      console.log(response.errors[0]);
      break;
    default:
      return;
  }
};
