export function sanitizeYear(year: string) {
    if (!year) {
        return undefined;
    }
    const _year = parseInt(year, 10);
    if (_year > 2008 && _year < 2023) {
        return String(year);
    } else {
        return undefined;
    }
}

export function sanitizeLeague(league: string) {
    if (!league) {
        return undefined;
    }
    league = league.toUpperCase();
    const _leagues = ['ACT', 'ARC1', 'ARC2', 'EUSKOTREN', 'ETE'];
    if (_leagues.indexOf(league) > -1) {
        return league;
    } else {
        return undefined;
    }
};

export function sanitizeChart(chart: string) {
    if (!chart) {
        return undefined;
    }
    const _charts = ['general_rank', 'points_per_race', 'points_total',
                     'tpoints_per_race', 'tpoints_total', 'trank',
                     'ages', 'tages', 'incorporations', 'cumulative'];
    if (_charts.indexOf(chart) > -1) {
        return chart;
    } else {
        return undefined;
    }
}
