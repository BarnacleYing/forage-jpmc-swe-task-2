import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, //new showGraph boolean for when we want to show the graph
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, //at first the show graph is false, the user needs to click on stream data for it to be true
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph){ //if show graph is true then it'll render the graph
        return (<Graph data={this.state.data}/>)
    }

  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() { //this gets data from server
    let x = 0;
    const interval = setInterval(() => { //doing this function at set interval states
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
          this.setState({
            data : serverResponds, //sets data to the serverResponds
            showGraph : true, //the graph will now be shown
           });
        });
        x++;
        if (x>1000) {//clears the interval after every second
            clearInterval(interval);
        }
    }, 100);// does this function every 100ms

  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
