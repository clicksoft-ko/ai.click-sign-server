export interface SocketResponse<T> {
  status: "success" | "error" | "none";
  data?: T;
  error?: { [key: string]: string };
  errorCode?: string;
  message?: string;
}