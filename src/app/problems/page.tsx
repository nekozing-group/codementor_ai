'use client'

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { syntaxHighlighting } from '@codemirror/language'
import { solarizedDark, solarizedDarkHighlightStyle, solarizedDarkTheme } from 'cm6-theme-solarized-dark'
import { historyField } from '@codemirror/commands';

const stateFields = { history: historyField };
const isBrowser = window !== undefined;

function App() {
  let serializedState, value;
  if (isBrowser) {
    serializedState = localStorage.getItem('myEditorState') ?? '';
    value = localStorage.getItem('myValue') ?? '';
  }
  
  const onChange = React.useCallback((val, viewUpdate) => {
    if (isBrowser) {
      localStorage.setItem('myValue', val);
      const state = viewUpdate.state.toJSON(stateFields);
      localStorage.setItem('myEditorState', JSON.stringify(state));
    }
  }, []);

  return <CodeMirror 
    theme={solarizedDarkTheme} 
    initialState={
      serializedState
          ? {
              json: JSON.parse(serializedState || ''),
              fields: stateFields,
            }
          : undefined
    }
    value={value} 
    height="200px" 
    extensions={[python(), solarizedDark, syntaxHighlighting(solarizedDarkHighlightStyle)]} 
    onChange={onChange} />;
}

export default App;