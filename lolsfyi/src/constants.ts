export const PLACEHOLDER_PLAYER = 'https://www.factor.gg/_next/image?url=https%3A%2F%2Ffactorassets.global.ssl.fastly.net%2Fplayer-headshots%2Fdefault.png&w=128&q=100';
export const PLACEHOLDER_TEAM = 'https://logos-world.net/wp-content/uploads/2021/09/LoL-Esports-Emblem.png';
export const PLACEHOLDER_CHAMPION = "https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/monkeyking.png";
export const LOL_LOGO = "https://am-a.akamaihd.net/image?resize=166:64&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Ffooter%2Flol.png";
export const LOL_ESPORTS = "https://logos-world.net/wp-content/uploads/2021/09/LoL-Esports-Logo-700x394.png";

export const TEAM_LOGOS = new Map([
    ['edwardgaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819297476_edg-2021-worlds.png'],
    ['royalnevergiveup', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819360134_rng-2021-worlds.png'],
    ['ohmygod', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1682322954525_Bilibili_Gaming_logo_20211.png'],
    ['jdgaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1627457924722_29.png'],
    ['lngesports', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819402484_lng-2021-worlds.png'],
    ['weibogaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1641202879910_3.png'],
    ['topesports', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592592064571_TopEsportsTES-01-FullonDark.png'],
    ['thundertalkgaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FTT-FullonDark.png'],
    ['anyoneslegend', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1641199582689_.png'],
    ['rareatom', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRA-FullonDark.png'],
    ['teamwe', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1634763008788_220px-Team_WE_logo.png'],
    ['ultraprime', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fultraprime.png'],
    ["ninjasinpyjamas", "https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1673425724696_NIP-Symbol-RGB-NeonYellow1.png"],
    ['lgdgaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FLGD-FullonDark-1.png'],
    ['funplusphoenix', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1627457887494_7_720.png'],
    ['invictusgaming', 'https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1634762917340_300px-Invictus_Gaming_logo.png'],
    ['victoryfive', 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/dd/Victory_Fivelogo_profile.png/revision/latest/scale-to-width-down/220?cb=20221110075800'],
    ['bilibiligaming', 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fb/Bilibili_Gaminglogo_profile.png/revision/latest?cb=20211201134817'],
  ]);
  

export const CHAMPION_URL = (name : string) => {
  if (name) {
    if (name === 'Wukong') name = 'monkeyking';
    name = name.toLowerCase().replace(/[.,' ]/g,"").trim();
  }
  return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${name}.png`;
};

export const TEAM_URL = (name : string) => {
  if (name) {
    name = name?.toLowerCase().replaceAll(' ',"").trim();
    if (TEAM_LOGOS.has(name)) return TEAM_LOGOS.get(name);
  }
  return PLACEHOLDER_TEAM;
}
