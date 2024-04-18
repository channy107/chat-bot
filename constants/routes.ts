export const BASE_URL = "/";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/signup",
};

export const CHAT_ROUTES = {
  NEW: "/new",
  CONVERSATION: "/conversations",
  TUNING: "/tuning",
  TUNING_LIST: "/tuning/list",
};

export const PROTECTED_ROUTES = [
  BASE_URL,
  CHAT_ROUTES.NEW,
  CHAT_ROUTES.CONVERSATION,
  CHAT_ROUTES.TUNING,
  CHAT_ROUTES.TUNING_LIST,
];
export const PUBLIC_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.SIGN_UP];
