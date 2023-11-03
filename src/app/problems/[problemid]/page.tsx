import ProblemNav from '@/lib/server-components/problem-nav';
import { SingleProblemApp } from '@/lib/server-components/single-problem-app';


export default function CodeInputPage({ params }: { params: { problemid: string } }) {
  
  return (
    <html>
      <body>
        <ProblemNav>
          <div className="md:container md:max-w-7xl content-start">
            <SingleProblemApp problemId={params.problemid} />
          </div>
        </ProblemNav>
      </body>
    </html>
  );
}