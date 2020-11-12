import Constants from './constants';
import Store from './store';

/** Unified configuration object that extends all other configuration classes.
 * The module exports an instance of the class so no need to initialize.
 */

class IsmetConfig extends Constants {
  store = new Store();
}

export default new IsmetConfig();
