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
    teams = [];
    rowers = [];

    runLayout = function(node){
      const p = node.data('orgPos');

      // const l = // node.neighborhood().filter(':visible').layout({
      const l = {
        name: 'concentric',
        fit: true,
        animate: true,
        animationDuration: 3,
        // animationEasing: easing,
        // boundingBox: {
        //   x1: p.x - 1,
        //   x2: p.x + 1,
        //   y1: p.y - 1,
        //   y2: p.y + 1
        // },
        // avoidOverlap: true,
        concentric: function( ele ){
          if( ele.data('team') ){
            return 2;
          } else {
            return 1;
          }
        },
        levelWidth: function(){ return 2; },
        padding: 25 // layoutPadding
      };

      // var promise = cy.promiseOn('layoutstop');

      // l.run();

      // return promise;
      return l;
    };

  layout = {
    name: 'concentric',
    fit: true,
    animate: true,
    animationDuration: 10,
    animationEasing: 'linear',
    concentric: function( ele ){
      if( ele.data('team') ){
        return 2;
      } else {
        return 1;
      }
    },
    levelWidth: function () { return 1; },
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
    this.taldeakService.getList('ACT', 2019)
      .subscribe(res => {
        this.teams = res.map(r => r.name);
        this.graphData = {
          nodes: res.map(element => {
            return {
              data: {
                id: element.name,
                name: element.name,
                weight: 100,
                colorCode: 'green',
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
    if (event.data('rower')){
      rower = event.data('name');
      console.log('Rower clicked', rower);
      this.loadRowerData(rower);
    }
    if (event.data('team')){
      team = event.data('name');
      console.log('Team clicked', team);
      this.loadTeamData(team);
    }
  }

  loadRowerData(rower: string) {
    console.log('Load data', rower);
    const theRower = this.rowers.find(r => r.name === rower);
    const nodes = [];
    const edges = [];
    for (const h of theRower.historial) {
      nodes.push({
        group: 'nodes',
        data: {
          id: h.name,
          name: h.name,
          weight: 100,
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
          colorCode: 'red'
        }
      });
    }

    this.graphData = {
      nodes: nodes,
      edges: edges
    };
  }

  loadTeamData(team: string) {
    this.taldeakService.getOne(team, 'ACT', 2019)
      .subscribe(res => {
        this.rowers = this.rowers.concat(res.rowers);
        const nodes = res.rowers.map(rower => {
          return {
            group: 'nodes',
            data: {
              id: rower.name,
              name: rower.name,
              weight: 100,
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
        for (const rower of res.rowers) {
          for (const h of rower.historial) {
            if (h.year === '2018' && h.name.toLowerCase() !== team.toLowerCase()){
              console.log('Other found:', rower.name, h.name);
              if (this.teams.indexOf(h.name) > -1) {
                edges.push({
                  group: 'edges',
                  data: {
                    id: `${rower.name}_${h.name}`,
                    target: rower.name,
                    source: h.name,
                    label: h.year,
                    strength: 1,
                    colorCode: 'red'
                  }
                });
              }
            }
          }
        };

        this.graphData = {
          nodes: nodes,
          edges: edges
        };
        // const newLayout = this.runLayout(event)
        // this.layout = newLayout;
      });
  }

}
