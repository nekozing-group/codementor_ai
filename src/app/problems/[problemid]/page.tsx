import ProblemNav from '@/lib/server-components/problem-nav';
import { SingleProblemApp } from '@/lib/server-components/single-problem-app';


export default function CodeInputPage({ params }: { params: { problemid: string } }) {
  
  return (
    <html>
      <body>
        <ProblemNav>
            <SingleProblemApp problemId={params.problemid} />
        </ProblemNav>
      </body>
    </html>
  );
}