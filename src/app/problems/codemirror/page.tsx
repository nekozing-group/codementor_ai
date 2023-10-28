'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { syntaxHighlighting } from '@codemirror/language'
import { solarizedDark, solarizedDarkTheme, solarizedDarkHighlightStyle } from 'cm6-theme-solarized-dark'

const extensions = [python(), solarizedDark, syntaxHighlighting(solarizedDarkHighlightStyle)];

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default function App() {
  const [code, setCode] = useLocalStorage('code', '');
  
  const onChange = React.useCallback((value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
  }, []);
  
  return (
    <CodeMirror
      value={code}
      height="200px"
      theme={solarizedDarkTheme}
      extensions={extensions}
      onChange={onChange}
    />
  );
}