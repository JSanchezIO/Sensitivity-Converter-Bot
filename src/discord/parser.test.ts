import Parser from './parser';

describe('Parser', () => {
  it.each([
    '/convert-sens -h',
    '/convert-sens --help',
    '/sens -h',
    '/sens --help',
    '/sens-public -h',
    '/sens-public --help',
  ])('outputs help information', (input: string) => {
    const target = new Parser();

    const result = target.execute(input);

    expect(result.messages[0].replace(/\n/g, '').replace(/ +/g, ' ')).toBe(
      "```usage: convert-sens [-v] [-c CPI] [-d {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}] [-h] [-p] [-u] [--usage] sensitivity from toA Discord bot designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.Positional arguments: sensitivity The sensitivity in the units indicated by the \"from\" argument. from The input data's unit type or custom yaw. to The output data's unit type or custom yaw.Optional arguments: -v, --version Show program's version number and exit. -c CPI, --cpi CPI Incorrectly referred to as DPI, or dots per inch, the CPI or counts per inch refers to the number of steps the mouse will report when moving an inch, i.e. this is the target mouse's DPI. -d {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}, --decimals {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15} The number of decimal places to round the output to, defaults to 5. -h, --help Prints this help message. -p, --public Denotes if the result should be displayed in the requesting channel. -u, --units Show the supported sensitivity types. --usage Show multiple examples.```"
    );
  });

  it.each([
    '/convert-sens -u',
    '/convert-sens --units',
    '/sens -u',
    '/sens --units',
    '/sens-public -u',
    '/sens-public --units',
  ])('outputs units information', (input: string) => {
    const target = new Parser();

    const result = target.execute(input);

    expect(result.messages[0].replace(/\n/g, '').replace(/ +/g, ' ')).toBe(
      '```The following units are available:apex,apex-legends,cs,csgo,fn,fortnite,fortnite-config,fortnite-slider,overwatch,ow,quake,rainbow-six,r6,r-6,rsix,r-six,siege,reflex,source,valorant,cm/rev,deg/mm,in/rev```'
    );
  });

  it.each(['/convert-sens --usage', '/sens --usage', '/sens-public --usage'])(
    'outputs usage information',
    (input: string) => {
      const target = new Parser();

      const result = target.execute(input);

      expect(result.messages[0].replace(/\n/g, '').replace(/ +/g, ' ')).toBe(
        '```usage: convert-sens [-v] [-c CPI] [-d {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}] [-h] [-p] [-u] [--usage] sensitivity from to```'
      );
    }
  );

  it.each(['/convert-sens 55 cm/rev cs', '/sens 55 cm/rev cs', '/sens-public 55 cm/rev cs'])(
    'outputs conversion',
    (input: string) => {
      const target = new Parser();

      const result = target.execute(input);

      expect(result.messages[0].replace(/\n/g, '').replace(/ +/g, ' ')).toBe(
        'Using 800 CPI, 55 cm/rev is approximately 0.94463 in CS:GO'
      );
    }
  );

  it.each([
    '/convert-sens 55 cm/rev in/rev',
    '/sens 55 cm/rev in/rev',
    '/sens 55 cm/rev in/rev -p=false',
    '/sens 55 cm/rev in/rev --public=false',
  ])('supports private responses', (input: string) => {
    const target = new Parser();

    const result = target.execute(input);

    expect(result.deleteRequest).toBe(true);
    expect(result.sendPrivately).toBe(true);
  });

  it.each([
    '/sens-pub 55 cm/rev in/rev',
    '/convert-sens 55 cm/rev in/rev -p',
    '/convert-sens 55 cm/rev in/rev --public',
    '/sens 55 cm/rev in/rev -p',
    '/sens 55 cm/rev in/rev --public',
  ])('supports public messages', (input: string) => {
    const target = new Parser();

    const result = target.execute(input);

    expect(result.deleteRequest).toBe(false);
    expect(result.sendPrivately).toBe(false);
  });
});
