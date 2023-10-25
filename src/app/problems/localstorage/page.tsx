'use client'

import { usePersistedState } from "@/utils/hooks";

import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { syntaxHighlighting } from '@codemirror/language'
import { solarizedDark, solarizedDarkTheme, solarizedDarkHighlightStyle } from 'cm6-theme-solarized-dark'

const extensions = [python(), solarizedDark, syntaxHighlighting(solarizedDarkHighlightStyle)];

export default function App() {
    const [code, setCode] = usePersistedState('code', '');
    
    const onChange = useCallback((value, viewUpdate) => {
      setCode(value);
    }, []);
    
    return (
      <div>
        <CodeMirror
          value={code}
          height="200px"
          theme={solarizedDarkTheme}
          extensions={extensions}
          onChange={onChange}
        />
        <button>Test Button</button>
      </div>
    );
  }