import CodeInput from '@/lib/client-components/code-input';
import { ProblemStatement } from '@/lib/server-components/problem-statement';
import { historyField } from '@codemirror/commands';
import { Theme, ThemePanel } from '@radix-ui/themes';

const stateFields = { history: historyField };

function App() {
  
  return (
    <div className='flex flex-col w-full m-1.5'>
      <ProblemStatement problemId='sort'></ProblemStatement>
      <div className='divider'></div>
      <CodeInput problemId='sort' />
    </div>
  );
    
}

export default function CodeInputPage() {
  return (
    <html>
      <body>
        <App />
      </body>
    </html>
  );
}