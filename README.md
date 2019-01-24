# Sensitivity Converter Bot
A Discord bot designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.

# Installation
[Install This Bot](https://discordapp.com/api/oauth2/authorize?client_id=536633635869163520&scope=bot&permissions=10240)

# Usage
```sh
/convert-sens --from fortnite-config --sens 0.02 --to cm/rev
```

# Arguments
```sh
-h, --help      Show this help message
-v, --version   Show the running version number
-c, --cpi       The target mouses DPI. Defaults to 800
-d, --decimals  The number of decimal places, between 0 - 15, to round the output to. Defaults to 5
-f, --from      The input "-s/--sens/--sensitivity" data type
-s, --sens, --sensitivity   The sensitivity to be converted. Must be in the units specified in "-f/--from"
-t, --to        The data type to convert the "-s/--sens/--sensitivity" to
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