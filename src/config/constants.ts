import {Options} from 'acorn';

/** Holds constant configuration settings.*/
export default class Constants {
  ecmaVersion: Options['ecmaVersion'] = 'latest';
  directive = '$(ismet)';
}
