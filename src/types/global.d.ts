import { DefaultSession, DefaultUser } from "next-auth";
export {};

declare global {
  interface Window {
    VideoCrypt?: {
      init: (config: {
        token: string;
        video_url: string;
        element: string;
        autoplay?: boolean;
      }) => void;
    };
  }
}

// global.d.ts

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }

  interface User extends DefaultUser {
    id_token?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}