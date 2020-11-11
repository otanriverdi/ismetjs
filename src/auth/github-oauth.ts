import axios from 'axios';
import config from 'config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {AddressInfo} from 'net';
import open from 'open';
import {v4 as uuidv4} from 'uuid';

const {ghClientID} = config;

const app = new Koa();
app.use(bodyParser());

const secret = 'FIGURE THIS OUT';

export default async function () {
  return new Promise((resolve, reject) => {
    const id = uuidv4();

    app.use(async ctx => {
      const {code, state} = ctx.request.query;

      if (code && state === id) {
        ctx.body = '🐙 Done! Go back to your terminal';

        const response = await axios.post(
          `https://github.com/login/oauth/access_token?client_id=${ghClientID}&client_secret=${secret}&code=${code}`,
          null,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        server.close();

        resolve(response.data.access_token);
      } else {
        reject(new Error('Invalid state on redirect.'));
      }
    });

    const server = app.listen(0);
    const port = (<AddressInfo>server.address()).port;

    open(
      `https://github.com/login/oauth/authorize/?client_id=${ghClientID}&redirect_uri=http://localhost:${port}&state=${id}`,
    );
  });
}
