import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestForm from "./TestForm";

const App = () => {
  return (
    <div>
      <TestForm/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
