import React, { useEffect, useState }  from 'react';
import './App.css';

import logo from './logo.svg';
import { vscode } from './utilities/vscode';
import { VSCodeButton, VSCodeTextArea, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";


export const App = () => {

  const [counter, setCounter] = useState(0)
  const [cve, setCVE] = useState('CVE-2019-12900')
  const [cveContent, setCVEContent] = useState<any>()

  useEffect(() => {
    // Listen for messages from the extension
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.command === 'sendCVE') {
        const cve = message.cve;
        // Now you can use configSettingValue in your React component
        console.log('CVE:', cve);
        setCVEContent(cve)
      }
    });
    vscode.postMessage({
      command: 'getConfig'
    });
  }, []);


  function getStuff() {
    vscode.postMessage({
      command: "getCVE",
      text: cve,
    });
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React WebView</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload. {counter}
      </p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>

      <VSCodeTextField value={cve} onInput={(e: { target: any; }) => setCVE(e?.target?.value)} />

      <VSCodeButton onClick={getStuff}>Show message with counter</VSCodeButton>

      <VSCodeTextArea value={JSON.stringify(cveContent)} resize='both'/>
    </div>
  );
}

export default App;
