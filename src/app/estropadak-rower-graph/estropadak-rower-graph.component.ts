import {Component, OnInit, Output, EventEmitter, AfterViewChecked} from '@angular/core';
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

export class EstropadakRowerGraphComponent implements AfterViewChecked{

    node_name: string;

    // runLayout = function(){
    //   var p = node.data('orgPos');

    //   var l = nhood.filter(':visible').makeLayout({
    //     name: 'concentric',
    //     fit: false,
    //     animate: true,
    //     animationDuration: aniDur,
    //     animationEasing: easing,
    //     boundingBox: {
    //       x1: p.x - 1,
    //       x2: p.x + 1,
    //       y1: p.y - 1,
    //       y2: p.y + 1
    //     },
    //     avoidOverlap: true,
    //     concentric: function( ele ){
    //       if( ele.same( node ) ){
    //         return 2;
    //       } else {
    //         return 1;
    //       }
    //     },
    //     levelWidth: function(){ return 1; },
    //     padding: layoutPadding
    //   });

    //   var promise = cy.promiseOn('layoutstop');

    //   l.run();

    //   return promise;
    // };

  layout = {
    name: 'concentric',
    concentric: function (ele) {
      return 1;
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

  ngAfterViewChecked() {
    this.taldeakService.getList('ACT', 2019)
      .subscribe(res => {
        this.graphData.nodes = res.map(element => {
          return {
            data: {
              id: element.name,
              name: element.name,
              weigth: 100,
              colorCode: 'green',
              shapeType: 'ellipse'
            }
          }
        });
      })
    this.zoom = 2;
  }

  nodeChange(event) {
    this.node_name = event;
  }

}
