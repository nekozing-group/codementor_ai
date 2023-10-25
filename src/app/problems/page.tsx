'use client'

import { submit_code } from '@/lib/components/clients';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import styles from '@/styles.module.css';
import { historyField } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { Blockquote, Button, Flex, Text, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { githubLightInit } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
const stateFields = { history: historyField };

const initialState = {
  message: null,
}

function App() {
  const [serializedState, setSerializedStage] = useState('');
  const [localStorageCode, setLocalStorageCode] = useLocalStorage('code', '');
  const [formState, formAction] = useFormState(submit_code, initialState);
  const [serverOutput, setServerOutput] = useState('');

  const { pending } = useFormStatus();

  const onChange = useCallback((val, viewUpdate) => {
    setLocalStorageCode(val);
  }, []);

  return (
    <Flex direction='column' gap='2'>
      <Text size='4'>Problem:</Text>
      <Blockquote className={styles.problem}>Problem Statement Placeholder</Blockquote>
      <Text size='3'>Your code here:</Text>
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

      {/* <form action={submit_code}>
        <input name='code' type='hidden' value={localStorageCode} />
        <Button type='submit'>Submit Code</Button>
      </form> */}

      <form action={formAction}>
        <input type="hidden" id="code" name="code" value={ localStorageCode } />
        <Button type='submit'>Submit Code</Button>
      </form>

      <Blockquote className={styles.problem}>{formState?.message}</Blockquote>
    </Flex>
  );
}

export default function () {
  return (
    <html>
      <body>
        <Theme>
          <App />
        </Theme>
      </body>
    </html>
  );
}