import Markdown from "react-markdown";
import { getProblemStatement } from "../server-functions/clients";

interface Props {
  problemId: string;
}

export async function ProblemStatement(props: Props): Promise<JSX.Element> {
  const md = await getProblemStatement(props.problemId);
  console.log(`fetching problem statement for ${props.problemId}`);
  // const [md] = await Promise.all([responseData]);
  console.log(md);
  return (
    <Markdown className='prose dark:prose-invert max-w-5xl'>{md}</Markdown>
  )
}