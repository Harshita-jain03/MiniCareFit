// src/lib/api/client.ts
import api from "../api";

export const get = (url: string, withAuth = false) =>
  api(url, { method: "GET", withAuth });

export const post = (url: string, body: any, withAuth = false) =>
  api(url, {
    method: "POST",
    body: JSON.stringify(body),
    withAuth,
  });

export const put = (url: string, body: any, withAuth = false) =>
  api(url, {
    method: "PUT",
    body: JSON.stringify(body),
    withAuth,
  });

export const del = (url: string, withAuth = false) =>
  api(url, { method: "DELETE", withAuth });
