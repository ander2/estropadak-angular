export function sanitizeYear(year: string) {
    const _year = parseInt(year, 10);
    if (_year > 2008 && _year < 2020) {
        return String(year);
    } else {
        return undefined;
    }
}

export function sanitizeLeague(league: string) {
    league = league.toLowerCase();
    const _leagues = ['act', 'arc1', 'arc2', 'euskotren', 'ete'];
    if (_leagues.indexOf(league) > -1) {
        return league;
    } else {
        return undefined;
    }
};

export function sanitizeChart(chart: string) {
    const _charts = ['general_rank', 'points_per_race', 'points_total',
        'tpoints_per_race', 'tpoints_total', 'trank'];
    if (_charts.indexOf(chart) > -1) {
        return chart;
    } else {
        return undefined;
    }
}
