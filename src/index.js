import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

document.write(
  `<a href="https://github.com/ilyabo/flowmap.gl-example">
    <img 
      style="position: absolute; top: 0; right: 0; border: 0;" 
      src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" 
      alt="Fork me on GitHub">
   </a>
 `
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
