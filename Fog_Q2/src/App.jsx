
import Grid from './components/Grid'; // Custom component for the grid structure

import './App.css'; // Application styling

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">FOG Full Stack Developer - Rain Pattern</h1>
        <Grid rows={15} cols={20} />
      </div>
    </div>
  );
}

export default App;
