import CodeInput from '@/lib/client-components/code-input';
import { ProblemStatement } from '@/lib/server-components/problem-statement';
import styles from '@/styles.module.css';
import { historyField } from '@codemirror/commands';
import { Container, Blockquote, Flex, Text, Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const stateFields = { history: historyField };

function App() {
  
  return (
    <Flex direction='column' gap='2'>
      <Text size='4'>Problem:</Text>
      <Blockquote className={styles.problem}>Problem Statement Placeholder</Blockquote>
      <ProblemStatement problemId='sort'></ProblemStatement>
      <Text size='3'>Your code here:</Text>
      <CodeInput problemId='sort' />
    </Flex>
  );
}

export default function CodeInputPage() {
  return (
    <html>
      <body>
        <Theme>
          <Container size='3'>
            <App />
          </Container>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}