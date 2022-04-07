interface Decoded {
  email: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}

export const getAuthenticatedUser = (token: string) => {
  const decoded: Decoded = JSON.parse(atob(token.split(".")[1]));
  console.log(decoded);
  return {
    email: decoded.email,
    exp: decoded.exp,
  };
};

export const getToken = () => localStorage.getItem("token");