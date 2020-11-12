import {getOrigin} from './helpers';

export default async function (): Promise<string> {
  const origin = await getOrigin();
  if (!origin.includes('github.com:')) {
    throw new Error('Currently ismet only supports Github repos!');
  }

  const repo = origin.split(':')[1].split('.')[0];

  return repo;
}
