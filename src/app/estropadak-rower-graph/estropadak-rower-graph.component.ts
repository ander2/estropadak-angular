import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { TaldeakService } from 'app/shared/taldeak.service';
import { StatsService } from 'app/shared/stats.service';

import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-estropadak-rower-graph',
  templateUrl: './estropadak-rower-graph.component.html',
  styles: [`
      ng2-cytoscape {
        height: 100vh;
        float: left;
        width: 100%;
        position: relative;
    }`],
})

export class EstropadakRowerGraphComponent implements AfterViewInit{

  node_name: string;
  teams = {};
  rowers = [];
  year: number = 2019;
  league = 'ACT';
  team: string;
  selectedRower;
  selectedNode;
  error: string;
  
  layout = {
    name: 'concentric',
    fit: true,
    animate: true,
    animationDuration: 10,
    animationEasing: 'linear',
    nodeDimensionsIncludeLabels: true,
    concentric: function( ele ){
      if( ele.data('team') ){
        return 2;
      } else {
        return 1;
      }
    },
    levelWidth: function () { return 2; },
    spacingFactor: 1.5 
  };

  graphData = {
    nodes: [
    ],
    edges: [
    ]
  };

  zoom = 1;

  constructor(
    private taldeakService: TaldeakService,
    private statsService: StatsService 
  ) { }

  ngAfterViewInit() {
    this.loadTeams(this.league, this.year);
  }

  yearLeagueChange(event) {
    this.year = event.year;
    this.league = event.league;
    this.selectedNode = this.selectedNode === null ? 0 : null;
    this.loadTeams(this.league, this.year);
  }

  loadTeams(league: string, year: number) {
    this.taldeakService.getList(league, year)
      .subscribe(res => {
        if (!this.teams[league]) {
          this.teams[league] = {};
        }
        this.teams[league][year] = res.map(r => r.name);
        this.graphData = {
          nodes: res.map(element => {
            return {
              data: {
                id: element.name,
                name: element.name,
                weight: 60,
                colorCode: this.statsService.teamColors(element.name),
                shapeType: 'ellipse',
                team: true
              }
            }
          }),
          edges: []
        };
      });
  }

  nodeChange(event) {
    let rower;
    let year;
    if (event.year) {
      year = event.year;
    } else {
      year = this.year;
    }
    if (year <2010) {
      return ;
    }
    this.node_name = event.node.data('name');
    if (event.node.data('rower')){
      rower = event.node.data('name');
      this.loadRowerData(rower);
    }
    if (event.node.data('team')){
      this.year = year;
      this.team = event.node.data('name');
      this.selectedRower = null;
      this.loadTeamData(this.team, year);
    }
  }

  loadRowerData(rower: string) {
    this.error = '';
    const theRower = this.rowers.find(r => r.name === rower);
    this.selectedRower = theRower;
    const nodes = [];
    const edges = [];
    const sortedH = theRower.historial.sort((a, b) => a.year - b.year);
    const reducedHist = theRower.historial.reduce((memo, h) => {
      if (memo.length ===0) {
        memo.push(h);
      } else {
        if (memo[memo.length -1].name !== h.name) {
          memo.push(h);
        }
      }
      return memo;
    }, []);
    reducedHist.reduce((memo, h) => {
      if (memo) {
        edges.push({
          group: 'edges',
          data: {
            id: `${memo.name}_${h.name}_${h.year}`,
            source: memo.name,
            target: h.name,
            label: h.year,
            strength: 2,
            colorCode: 'red'
          }
        });
      }
      return h;
    }, null);
    nodes.push({
      group: 'nodes',
      data: {
        id: this.team,
        name: this.team,
        weight: 80,
        colorCode: this.statsService.teamColors(this.team),
        shapeType: 'ellipse',
        team: true
      }
    });
    edges.push({
      group: 'edges',
      data: {
        id: `${theRower.name}_${this.team}`,
        source: theRower.name,
        target: this.team,
        label: this.year,
        strength: 1,
        colorCode: 'blue'
      }
    });
    for (const h of theRower.historial) {
      nodes.push({
        group: 'nodes',
        data: {
          id: h.name,
          name: h.name,
          weight: 80,
          colorCode: this.statsService.teamColors(h.name),
          shapeType: 'ellipse',
          team: true
        }
      });
      edges.push({
        group: 'edges',
        data: {
          id: `${theRower.name}_${h.name}`,
          source: theRower.name,
          target: h.name,
          label: h.year,
          strength: 1,
          colorCode: 'blue'
        }
      });
    }

    this.graphData = {
      nodes: nodes,
      edges: edges
    };
  }

  loadTeamData(team: string, year: number) {
    let league;
    this.error = '';
    this.taldeakService.getOne(team, this.league, year)
      .pipe(catchError(err => {
        if (this.league.toLowerCase() === 'act') {
          league = 'ARC1';
        } else if (this.league.toLowerCase() === 'arc1'){
          league = 'ARC2';
        } else if (this.league.toLowerCase() === 'arc2'){
          league = 'ARC1';
        } 
        return this.taldeakService.getOne(team, league, year)
      }))  
      .pipe(catchError(err => {
        if (this.league.toLowerCase() === 'act') {
          league = 'ARC2';
        } else if (this.league.toLowerCase() === 'arc1'){
          league = 'ACT';
        }
        return this.taldeakService.getOne(team, league, year)
      }))  
      .subscribe(res => {
        if (league) {
          this.league = league;
        }
        this.rowers = this.rowers.concat(res.rowers);
        const nodes = res.rowers.map(rower => {
          return {
            group: 'nodes',
            data: {
              id: rower.name,
              index: rower.index,
              name: rower.name,
              weight: 80,
              colorCode: 'green',
              shapeType: 'ellipse',
              rower: true
            }
          }
        });

        const edges = res.rowers.map(rower => {
          return {
            group: 'edges',
            data: {
              id: `${rower.name}_${team}`,
              source: rower.name,
              target: team,
              strength: 1,
              colorCode: 'blue'
            }
          }
        });

        this.graphData = {
          nodes: nodes,
          edges: edges
        };
      },
      (err) => {
        this.error = 'Ez dago daturik aukeratutako taldearentzat, urte eta liga horretan';
      });
  }

  goToClubYear(club: string, year: number) {
    this.selectedNode = {club, year}; // loadTeamData(club, year);
  }

  teamClicked(historial) {
    this.goToClubYear(historial.name, historial.year);
  }

}
