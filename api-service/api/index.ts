import { RequestHandler } from 'express';
import * as express from 'express';
import { createApp } from '../src/main';

let appHandler: RequestHandler | null = null;

async function getAppHandler(): Promise<RequestHandler> {
  if (!appHandler) {
    const app = await createApp({ listen: false });
    const expressApp = app.getHttpAdapter().getInstance<express.Express>();
    appHandler = expressApp;
  }
  return appHandler;
}

export default async function handler(req: any, res: any) {
  const handlerFn = await getAppHandler();
  return handlerFn(req, res);
}
