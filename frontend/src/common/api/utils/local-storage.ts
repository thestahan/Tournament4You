interface Decoded {
  email: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}

export const getAuthenticatedUser = (token: string) => {
  const decoded: Decoded = JSON.parse(atob(token.split(".")[1]));

  return {
    email: decoded.email,
    exp: decoded.exp,
  };
};

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (token === null || token === "undefined" || token === "") {
    return false;
  } else {
    return true;
  }
};
