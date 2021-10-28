const leagues = [
    {name: 'A-League (AUS - 2021)', id: 1334},
    {name: 'CFA Super League (CN - 2021)', id: 1353},
    {name: 'J.League (JAP - 2021)', id: 1357},
    {name: 'MLS (USA - 2021)', id: 1264},
]

const data = [];

for (const league of leagues) {
    data.push({
        key: league.id,
        value: league.name,
        clubsUrl: `leagueTable/${league.id}`,
        matchesUrl: `fixtures/league/${league.id}?timezone=America%2FSao_Paulo`
    });
}

export default data;