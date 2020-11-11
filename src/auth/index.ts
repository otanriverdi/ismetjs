import ghOAuth from './github-oauth';

export default async function () {
  // check if the user is already logged in,
  // if not
  return await ghOAuth();

  // return the user
}
