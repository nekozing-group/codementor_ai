'use client'

import useLocalStorage from '@/lib/hooks/use-local-storage';
import { submitCode } from '@/lib/server-functions/clients';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { githubLightInit, githubDarkInit } from '@uiw/codemirror-theme-github';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import LLMFeedback from './llm-feedback';

export default function CodeInput(props: { problemId: string }) {
  const [localStorageCode, setLocalStorageCode] = useLocalStorage('code', '');
  const [serverResponse, setServerResponse] = useState('');

  const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    setLocalStorageCode(val);
  }, [setLocalStorageCode]);

  const actionWithResponse = async (formData: FormData) => {
    setServerResponse('');
    const response = await submitCode(formData);
    console.log(response);
    setServerResponse(response.exec_result);
  }

  return (
    <div>
      <CodeMirror
        theme={githubLightInit({
          settings: {
            caret: '#c6c6c6',
            fontFamily: 'monospace',
          }
        })}

        value={localStorageCode}
        height='200px'
        extensions={[python(), indentUnit.of('    ')]}
        onChange={onChange}
      />
      <form action={actionWithResponse}>
        <input type="hidden" id="code" name="code" value={localStorageCode} />
        <input type="hidden" id="problemId" name="problemId" value="sort" />
        <button className='btn btn-primary' type='submit'>Submit Code</button>
      </form>

      <LLMFeedback serverResponse={serverResponse}/>
    </div>
  )
}