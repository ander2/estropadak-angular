import { Component, OnInit, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare var cytoscape: any;

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
        height: 500px;
        width: 100%;
    }`]
})


export class NgCytoComponent implements OnInit, OnChanges {

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Input() public selected: any;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  private graph;
  private selectedNode;
  private initLayout;
  private initValues;

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
        'width': 'mapData(weight)',
        'content': 'data(name)',
        'background-color': 'data(colorCode)',
        'color': '#000',
        'font-size': 8,
        'font-weight': 'bold'
      })
      .selector(':selected')
      .css({
        'border-width': 1,
        'border-color': 'black',
        'text-valign': 'bottom',
      })
      .selector('edge')
      .css({
        'font-size': 7,
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
      })
      .selector('.rower')
      .css({
        'shape': 'data(shapeType)',
        'width': 'mapData(weight)',
        'content': 'data(name)',
        'background-color': '#FFF',
        'background-image': 'assets/rowing-24px.svg',
        'color': '#000',
        'font-size': 8,
        'font-weight': 'bold'
      });
  }

  public ngOnInit() {
    this.render();
  }

  public ngOnChanges(changes): any {
    if (this.graph) {
      if (changes.selected) {
        if (changes.selected.currentValue) {
          const node = this.graph.$(`node[name= '${changes.selected.currentValue.club}']`);
          this.selectNode(node, changes.selected.currentValue.year);
        } else {
          this.selectedNode = null;
        }
      }
      if (changes.elements && this.selectedNode) {
        const curatedNewNodes = [];
        this.deleteOtherNodes(this.selectedNode);
        const newVal = changes.elements.currentValue;
        this.graph.add(newVal);
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
          avoidOverlap: true,
          boundingBox: {
            x1: p.x - 1,
            x2: p.x + 1,
            y1: p.y - 1,
            y2: p.y + 1
          },
          minNodeSpacing: 50,
          spacingFactor: spacingFactor,
          concentric: function( ele ){
            if( ele.same( _this.selectedNode ) ){
              return 3;
            } 
            if (ele.data('index') && ele.data('index') % 2 === 0) {
              return 2;
            } else {
              return 1;
            }
          },
          padding: 20,
          levelWidth: function () { return 1; },
        }).run();
        this.graph.$('[rower]').addClass('rower');
      }
      if (changes.elements && !this.selectedNode) {
        this.graph.nodes().remove();
        this.graph.edges().remove();
        this.initValues = changes.elements.currentValue;
        this.graph.add(this.initValues);
        this.graph.layout(this.layout).run();
      }

      if (changes.layout) {
        this.graph.layout = changes.layout.currentValue;
        this.layout = changes.layout.currentValue;
        // this.selectedNode.closedNeighborhood().filter(':visible').layout(this.initLayout).run();
        this.graph.layout(this.initLayout).run();
      }
    }

    if (changes.layout) {
      if (changes.layout.firstChange) {
        this.initLayout = changes.layout.currentValue;
      }
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
      this.selectNode(node);
    });

    this.graph.on('tap', (e) => {
      if (e.target === this.graph) {
        this.selectedNode = null;
        this.graph.elements().remove();
        this.graph.add(this.initValues);
        this.graph.layout(this.initLayout).run();
      }
    });
  }

  deleteOtherNodes(node: any){
    this.graph.$('[id!="'+node.id()+'"]').remove();
  }

  selectNode(node: any, year?: number) {
    var neighborhood = node.neighborhood().add(node);
    node.data('orgPos', {
      x: node.position().x,
      y: node.position().y
    });
    this.selectedNode = node;
    if (!year) {
      if (this.graph.$('edge[target="'+node.id()+'"]').filter(':visible').length) {
        year = parseInt(this.graph.$('edge[target="'+node.id()+'"]').filter(':visible')[0].data('label'), 10);
      } 
    }
    this.select.emit({
      year,
      node
    });
  }

}
