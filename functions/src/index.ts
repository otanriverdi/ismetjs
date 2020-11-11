import axios from 'axios';
import * as functions from 'firebase-functions';

export const token = functions.https.onRequest(
  async (request, response): Promise<any> => {
    // secret is stored on firebase
    const secret = functions.config().github.secret;

    const id = 'ec5084fcd83b641e208e';

    const {code} = request.query;

    if (!code) {
      response.status(401);
      return response.send();
    }

    if (!secret) {
      response.status(500);
      return response.send();
    }

    const res = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${id}&client_secret=${secret}&code=${code}`,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return response.send(res.data);
  },
);
