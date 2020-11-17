import {logout} from 'auth';
import {exit} from 'helpers';

/**
 * Logs the user out and exits.
 */
export default function logoutCommand(): void {
  logout();
  exit('Logged out', 0);
}
