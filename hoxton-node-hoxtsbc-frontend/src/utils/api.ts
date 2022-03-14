import { RequestBody } from "./types";

// FINISH-ME: set to your server's endpoint
export const host = `http://localhost:8000`;

export const sendRequest = async (
  endpoint: string,
  method: string,
  bodyParam?: RequestBody,
  token?: string
) => {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) headers.authorization = token;

  const body = bodyParam ? JSON.stringify(bodyParam) : undefined;

  const result = await fetch(`${host}/${endpoint}`, {
    method,
    headers,
    body,
  });

  return result.json();
};

export const handleLogout = async () => {
  //FINISH-ME: remove token from local storage

  window.location.href = "/";
};

export const handleSignUp = async (body: RequestBody) => {
  await sendRequest("register", "POST", body);
  window.location.href = "/";
};

export const handleLogin = async (body: RequestBody) => {
  const result = await sendRequest("log-in", "POST", body);

  const { data, token, error } = result;
  // FINISH-ME: set token in local storage
  localStorage.setItem("token", token);
  return { data, error };
};

export const signInWithJWT = async () => {
  let token; // FINISH-ME: check for token
  // Note: if token is not found, it can be 'undefined'(string)

  const result = await sendRequest("banking-info", "POST", undefined, token);

  return result || null;
};
