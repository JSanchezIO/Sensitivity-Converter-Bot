import { divide, number, pi } from 'mathjs';
import { IMetric } from '../interfaces';

const metrics: IMetric[] = [
  {
    aliases: ['cs', 'csgo'],
    name: 'CS:GO',
    yaw: number(0.022)
  },
  {
    aliases: ['cm/rev'],
    name: 'cm/rev',
    yaw: number(0)
  },
  {
    aliases: ['fortnite', 'fortnite-config'],
    name: 'Fortnite Config',
    yaw: number(2.222)
  },
  {
    aliases: ['fortnite-slider'],
    name: 'Fortnite Slider',
    yaw: number(0.5555)
  },
  {
    aliases: ['in/rev'],
    name: 'in/rev',
    yaw: number(0)
  },
  {
    aliases: ['overwatch', 'ow'],
    name: 'Overwatch',
    yaw: number(0.0066)
  },
  {
    aliases: ['quake'],
    name: 'Quake',
    yaw: number(0.022)
  },
  {
    aliases: ['rainbow-six', 'r6', 'r-6', 'rsix', 'r-six', 'siege'],
    name: 'Rainbow Six Siege',
    yaw: divide(0.018, pi)
  },
  {
    aliases: ['reflex'],
    name: 'Reflex',
    yaw: divide(0.018, pi)
  },
  {
    aliases: ['source'],
    name: 'Source',
    yaw: number(0.022)
  }
];

export { metrics };
