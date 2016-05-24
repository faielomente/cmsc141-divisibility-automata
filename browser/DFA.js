var input;
var divisor;
var transitions = [];
var paths = []

function main() {
    input = document.getElementById("input").value;
    divisor = document.getElementById("divisor").value;
    var dictionary = [];
    var list = [];
    // alert("Input: " + input + 2\nDivi10sor);
    // for (var i = 2; i < 10; i++) {
    //    create2dArray(i);
    //    populateTable(i);
    //    console.log(isMultiple(i));
    //    if (isMultiple(i) == true) {
    //     list.push(i);
    //    }
    // }
    create2dArray(divisor);
    populateTable(divisor);
    if (isMultiple(divisor) == true) {
        list.push(divisor);
    }
    console.log("LCM: " + list);
    init(divisor);
    highlightPath(paths);
}

function create2dArray(divisor) {
    transitions = new Array(divisor);
    for (var i = 0; i < divisor; i++){
        transitions[i] = new Array(divisor);
    }
}

function populateTable(divisor){
    for (var state = 0; state < divisor; state++) {
        for (var remainder = 0; remainder < divisor; remainder++) {
            var nextState = ((state*10)+remainder)%divisor;
            transitions[state][remainder] = nextState;
        }
    }
    console.log(transitions.join("\n"));
}

function isMultiple(divisor){
    var next = 0;
    var state = 0;
    var remainder = 0;

    console.log("State: " + transitions[state][remainder]);
    paths.push(transitions[state][remainder]);
    for (var i = 0; i < input.length; i++) {
        var temp = Number(input[i]);
        remainder = temp%divisor;
        console.log("State: " + transitions[state][remainder]);
        paths.push(transitions[state][remainder]);
        next = transitions[state][remainder];
        state = next;
    }
    console.log(paths);
    if (state==0)
        return true;
    else
        return false;
}

/*-----------------------------------------------------------------------------------------*/
/*--------------------------------Automata Visualization-----------------------------------*/

function init(divisor) {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    myDiagram =
      $(go.Diagram, "myDiagramDiv", // must be the ID or reference to div
        {
          initialAutoScale: go.Diagram.UniformToFill,
          padding: 10,
          contentAlignment: go.Spot.Center,
          layout: $(go.ForceDirectedLayout, { defaultSpringLength: 10 }),
        });
    // define the Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { locationSpot: go.Spot.Center,  // Node.location is the center of the Shape
          locationObjectName: "SHAPE",
          selectionAdorned: false,
        },
        $(go.Panel, "Auto",
          $(go.Shape, "Ellipse",
            { name: "SHAPE",
              fill: "lightgray",  // default value, but also data-bound
              stroke: "transparent",  // modified by highlighting
              strokeWidth: 2,
              desiredSize: new go.Size(50, 50),
              portId: "" },
              new go.Binding("fill", "color")), // so links will go to the shape, not the whole node
        $(go.TextBlock,
          new go.Binding("text", "value")))
        );
    // define the Link template
    myDiagram.linkTemplate =
      $(go.Link,
        {
          selectable: false,      // links cannot be selected by the user
          curve: go.Link.Bezier,
          layerName: "Background"  // don't cross in front of any nodes
        },
        $(go.Shape,  // this shape only shows when it isHighlighted
          { isPanelMain: true, stroke: null, strokeWidth: 5 },
          new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : null; }).ofObject()),
        $(go.Shape,
          // mark each Shape to get the link geometry with isPanelMain: true
          { isPanelMain: true, stroke: "black", strokeWidth: 1 },
          new go.Binding("stroke", "color")),
        $(go.Shape, { toArrow: "Standard" })
      );

    generateGraph(divisor);
    // select two nodes that connect from the first one to the second one
    var num = myDiagram.model.nodeDataArray.length;
    var node1 = null;
    var node2 = null;
    for (var i = 0; i < num; i++) {
      node1 = myDiagram.findNodeForKey(i);
      // var distances = findDistances(node1);
      for (var j = 0; j < num; j++) {
        node2 = myDiagram.findNodeForKey(j);
        // var dist = distances.getValue(node2);
        // if (dist > 1 && dist < Infinity) {
        //   node1.isSelected = true;
        //   node2.isSelected = true;
        //   break;
        // }
      }
      if (myDiagram.selection.count > 0) break;
    }
  }
  function generateGraph(divisor) {
    var nodeDataArray = [];
    for (var i = 0; i < divisor; i++) {
      nodeDataArray.push({ key: i, value: i, color: go.Brush.randomColor(128, 240) });
    }
    var linkDataArray = [];
    var num = nodeDataArray.length;
    for (var i = 0; i < transitions.length; i++) {
        for (var j = 0; j < transitions.length; j++) {
            var a = i;
            var b = transitions[i][j];
            linkDataArray.push({ from: a, to: b, color: go.Brush.randomColor(0, 127) });
        }
    }
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  }

  // When a node is selected show distances from the first selected node.
  // When a second node is selected, highlight the shortest path between two selected nodes.
  // If a node is deselected, clear all highlights.

  function highlightSelectedPath() {
    var sel = document.getElementById("myPaths");
    var idx = sel.selectedIndex;
    var opt = sel.options[idx];
    var val = opt.value;
    highlightPath(paths.elt(sel.selectedIndex));
  }
  // Highlight a particular path, a List of Nodes.
  function highlightPath(path) {
    myDiagram.startTransaction("highlight");
    myDiagram.clearHighlighteds();
    for (var i = 0; i < path.length; i++) {
        if (i == path.length-1)
            break;
        var a = myDiagram.findNodeForKey(path[i]);
        var b = myDiagram.findNodeForKey(path[i+1]);
        a.findLinksTo(b).each(function(l) { l.isHighlighted = true; });
    }
    myDiagram.commitTransaction("highlight");
  }