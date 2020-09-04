import {sampleSize} from 'lodash';

export default async function load(count = 10) {
  const req = await fetch('suitype/js/english_10k.json')
  const res = await req.json()
  return sampleSize(res, count)
};
