export { };
type Match = { team1: string; team2: string };
type Schedule = Match[];

export function generateRoundRobin(teams: string[]): Schedule {
    const schedule: Schedule = [];

    if (teams.length % 2 !== 0) {
        teams.push('BYE');
    }

    const numberOfRounds = teams.length - 1;

    for (let round = 0; round < numberOfRounds; round++) {
        const roundMatches: Match[] = [];

        for (let i = 0; i < teams.length / 2; i++) {
            const team1 = teams[i];
            const team2 = teams[teams.length - 1 - i];

            if (team1 !== 'BYE' && team2 !== 'BYE') {
                roundMatches.push({ team1, team2 });
            }
        }

        schedule.push(...roundMatches);


        teams = [teams[0], teams[teams.length - 1], ...teams.slice(1, teams.length - 1)];
    }

    return schedule;
}