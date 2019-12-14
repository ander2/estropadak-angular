import { Component, OnInit, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare var cytoscape: any;

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
        height: 100%;
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
    }`]
})


export class NgCytoComponent implements OnInit, OnChanges {

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  private graph;
  private selectedNode;
  private initLayout;

  public constructor(private renderer: Renderer, private el: ElementRef) {

    this.initLayout = {
      name: 'concentric',
      concentric: function( ele ){
        return 1;
      },
      levelWidth: function () { return 1; },
    };

    this.layout = this.initLayout;

    this.zoom = this.zoom || {
      min: 0.1,
      max: 1.5
    };

    this.style = this.style || cytoscape.stylesheet()

      .selector('node')
      .css({
        'shape': 'data(shapeType)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'data(colorCode)',
        'background-color': 'data(colorCode)',
        'color': '#fff',
        'font-size': 10
      })
      .selector(':selected')
      .css({
        'border-width': 1,
        'border-color': 'black'
      })
      .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'line-color': 'data(colorCode)',
        'source-arrow-color': 'data(colorCode)',
        'target-arrow-color': 'data(colorCode)'
      })
      .selector('edge[label]')
      .css({
        'label': 'data(label)',
      })
      .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      })
      .selector('.hidden')
      .css({
        'display': 'none',
        'visibility': 'hidden'
      });
      ;
  }

  public ngOnInit() {
    console.log('Init');
    this.render();
  }

  public ngOnChanges(changes): any {
    if (this.graph) {
      if (changes.elements && this.selectedNode) {
        console.log('On elemnts Changes', changes);
        const curatedNewNodes = [];
        changes.elements.currentValue.nodes.forEach(n => {
          if ( this.graph.$(`node[name = '${n.data.name}']`).length > 0) {
            this.graph.$(`node[name = '${n.data.name}']`).removeClass('hidden');
            this.graph.$(`edge[source = '${n.data.id}']`).removeClass('hidden');
            this.graph.$(`edge[target = '${n.data.id}']`).removeClass('hidden');
          } else {
            curatedNewNodes.push(n);
          }
        })
        const newVal = changes.elements.currentValue;
        newVal.nodes = curatedNewNodes;
        this.graph.add(newVal);
        // this.graph.elements(':visible').layout(this.layout).run();
        const p = this.selectedNode.data('orgPos');
        const _this = this;
        let spacingFactor = 1;
        if (this.selectedNode.data('rower')){
          spacingFactor = 2;
        }
        this.selectedNode.closedNeighborhood().filter(':visible').makeLayout({
          name: 'concentric',
          animate: true,
          animationDuration: 500,
          animationEasing: 'linear',
          boundingBox: {
            x1: p.x - 1,
            x2: p.x + 1,
            y1: p.y - 1,
            y2: p.y + 1
          },
          avoidOverlap: true,
          spacingFactor: spacingFactor,
          concentric: function( ele ){
            // this.selectedNode 
            if( ele.same( _this.graph.$('node:selected') ) ){
              return 2;
            } else {
              return 1;
            }
          },
          levelWidth: function () { return 1; },
        }).run();
      }
      if (changes.elements && !this.selectedNode) {
        console.log('On elemnts first Change');
        // this.graph.layout = this.layout;
        this.graph.add(changes.elements.currentValue);
        this.graph.layout(this.layout).run();
        // this.selectedNode.neighborhood().filter(':visible').layout(this.layout).run();
      }

      if (changes.layout) {
        console.log('On layou Change');
        this.graph.layout = changes.layout.currentValue;
        this.layout = changes.layout.currentValue;
        // this.selectedNode.closedNeighborhood().filter(':visible').layout(this.initLayout).run();
        this.graph.layout(this.initLayout).run();
      }
    }

    if (changes.layout) {
      console.log('On layou Change');
      this.layout = changes.layout.currentValue;
    }
  }

  public render() {
    let cy_contianer = this.renderer.selectRootElement("#cy");
    let localselect = this.select;
    this.graph = cytoscape({
      container: cy_contianer,
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    });


    this.graph.on('tap', 'node', (e) => {
      var node = e.target;
      var neighborhood = node.neighborhood().add(node);
      node.data('orgPos', {
        x: node.position().x,
        y: node.position().y
      });
      this.selectedNode = node;
      let year;
      if (this.graph.$('edge[target="'+node.id()+'"]').filter(':visible').length) {
        year = this.graph.$('edge[target="'+node.id()+'"]')[0].data('label');
      } else {
        year = 2019;
      }
      this.graph.elements().addClass('hidden');
      node.removeClass('hidden');
      localselect.emit({
        year,
        node
      });
    });

    this.graph.on('tap', (e) => {
      if (e.target === this.graph) {
        this.selectedNode = null;
        this.graph.elements().removeClass('hidden');
        this.graph.elements("node[rower]").addClass('hidden');
        this.graph.elements("node[team]").layout(this.initLayout).run();
      }
    });
  }

}
