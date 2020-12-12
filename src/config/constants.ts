import {Options} from 'acorn';

/** Holds constant configuration settings.*/
export default class Constants {
  ecmaVersion: Options['ecmaVersion'] = 'latest';
  acceptedExtensions = ['js', 'jsx'];
  ghClientID = 'ec5084fcd83b641e208e';
  ghOAuthURL = 'https://github.com/login/oauth/authorize';
  ghApiURL = 'https://api.github.com';
  scope = 'repo';
  accessTokenURL = 'https://us-central1-ismetjs.cloudfunctions.net/token';
}
