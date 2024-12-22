import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * 環境がサーバー側かクライアント側かを判定する式
 * クライアントコンポーネント以外のテストも実行するため、Vitest環境では常にtrueを返す
 * @default typeof window === "undefined"
 * @see https://github.com/t3-oss/t3-env/blob/main/packages/core/src/index.ts
 */
const isServer =
  typeof window === 'undefined' || process.env.NODE_ENV === 'test' || process.env.IS_STORYBOOK === 'true';

export const env = createEnv({
  isServer,
  server: {
    BASE_URL: z.string().optional().default('lockerai-survey.vercel.app'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VERCEL_URL: z.string().optional(),
    PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.string().startsWith('postgresql://'),
    SECRET: z.string(),
    LOOPS_API_KEY: z.string(),
  },
  client: {
    // example:
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_DISABLE_VOTE: z.coerce.boolean().optional().default(false),
  },
  runtimeEnv: {
    // you'll have to destructure all the keys manually.
    // This is due to how Next.js bundles environment variables and
    // only explicitly accessed variables are included in the bundle.
    // Refer: https://env.t3.gg/docs/nextjs
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET: process.env.SECRET,
    LOOPS_API_KEY: process.env.LOOPS_API_KEY,
    NEXT_PUBLIC_DISABLE_VOTE: process.env.NEXT_PUBLIC_DISABLE_VOTE,
  },
});
