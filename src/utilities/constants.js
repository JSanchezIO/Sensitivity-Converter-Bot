const math = require('mathjs');

const units = [
  {
    aliases: ['cm/rev'],
    name: 'cm/rev'
  },
  {
    aliases: ['fortnite', 'fortnite-config'],
    name: 'Fortnite Config',
    yaw: math.number(2.222)
  },
  {
    aliases: ['fortnite-slider'],
    name: 'Fortnite Slider',
    yaw: math.number(0.5555)
  },
  {
    aliases: ['in/rev'],
    name: 'in/rev'
  },
  {
    aliases: ['overwatch', 'ow'],
    name: 'Overwatch',
    yaw: math.number(0.0066)
  },
  {
    aliases: ['quake'],
    name: 'Quake',
    yaw: math.number(0.022)
  },
  {
    aliases: ['rainbow-six', 'r6', 'r-6', 'rsix', 'r-six', 'siege'],
    name: 'Rainbow Six Siege',
    yaw: math.divide(0.018, math.pi)
  },
  {
    aliases: ['reflex'],
    name: 'Reflex',
    yaw: math.divide(0.018, math.pi)
  },
  {
    aliases: ['source'],
    name: 'Source',
    yaw: math.number(0.022)
  }
];

module.exports = { units };
