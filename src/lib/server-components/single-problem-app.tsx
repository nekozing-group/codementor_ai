import CodeInput from '@/lib/client-components/code-input';
import { ProblemStatement } from '@/lib/server-components/problem-statement';

interface Props {
  problemId: string;
}

export async function SingleProblemApp(props: Props) {
  
  return (
    <div className='flex flex-col w-full m-1.5'>
      <ProblemStatement problemId={ props.problemId }></ProblemStatement>
      <div className='divider'></div>
      <CodeInput problemId={ props.problemId } />
    </div>
  );
    
}