import {sampleSize} from 'lodash';
import data from '../data/english_10k.json'

export default function load(count = 10) {
  return sampleSize(data, count)
};
