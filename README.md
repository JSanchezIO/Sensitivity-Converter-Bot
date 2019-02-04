# Sensitivity Converter Bot
A Discord bot designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.

# Installation
[Install This Bot](https://discordapp.com/api/oauth2/authorize?client_id=536633635869163520&scope=bot&permissions=10240)

# Usage
```sh
/convert-sens 0.08 fortnite-slider overwatch
/convert-sens 0.08 fortnite-slider cm/rev
/convert-sens 0.08 fortnite-slider cm/rev --cpi 400
```

# Arguments
```sh
-c, --cpi       The target mouses DPI. Defaults to 800
-d, --decimals  The number of decimal places, between 0 - 15, to round the output to. Defaults to 5.
-h, --help      Show this help message
-p, --public    Denotes if the result should be displayed in the requesting channel or privately in a DM.
-u, --units     Show the supported sensitivity types
--usage         Show multiple examples
-v, --version   Show the running version number
```

# Supported Sensitivity Types
- cm/rev
- Counter Strike: Global Offensive (`cs` or `csgo`)
- Fortnite Config (`fortnite` or `fortnite-config`)
- Fortnite Slider (`fortnite-slider`)
- in/rev
- Overwatch (`overwatch` or `ow`)
- Quake (`quake`)
- Rainbow Six Siege (`rainbow-six`, `r6`, `r-6`, `rsix`, `r-six`, `siege`)
- Reflex (`reflex`)
- Source (`source`)