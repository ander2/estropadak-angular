import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { TaldeakService } from 'app/shared/taldeak.service';

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
    private taldeakService: TaldeakService
  ) { }

  ngAfterViewInit() {
    this.loadTeams(this.league, this.year);
  }

  yearLeagueChange(event) {
    this.year = event.year;
    this.league = event.league;
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
                colorCode: 'grey',
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
    let team;
    let rower;
    let year;
    if (event.year) {
      year = event.year;
    } else {
      year = this.year;
    }
    this.node_name = event.node.data('name');
    if (event.node.data('rower')){
      rower = event.node.data('name');
      console.log('Rower clicked', rower);
      this.loadRowerData(rower);
    }
    if (event.node.data('team')){
      this.year = year;
      team = event.node.data('name');
      this.team = team;
      console.log('Team clicked', team);
      this.loadTeamData(team, year);
    }
  }

  loadRowerData(rower: string) {
    console.log('Load data', rower);
    const theRower = this.rowers.find(r => r.name === rower);
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
        colorCode: 'green',
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
          colorCode: 'green',
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
    this.taldeakService.getOne(team, this.league, year)
      .subscribe(res => {
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
        // for (const rower of res.rowers) {
        //   for (const h of rower.historial) {
        //     if (h.year === '2018' && h.name.toLowerCase() !== team.toLowerCase()){
        //       console.log('Other found:', rower.name, h.name);
        //       if (this.teams.indexOf(h.name) > -1) {
        //         edges.push({
        //           group: 'edges',
        //           data: {
        //             id: `${rower.name}_${h.name}`,
        //             target: rower.name,
        //             source: h.name,
        //             label: h.year,
        //             strength: 1,
        //             colorCode: 'red'
        //           }
        //         });
        //       }
        //     }
        //   }
        // };

        this.graphData = {
          nodes: nodes,
          edges: edges
        };
      });
  }

}
