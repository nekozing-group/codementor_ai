'use client'

import Markdown from "react-markdown";

interface Props {
  serverResponse: any;
}
export default function LLMFeedback(props: Props) {
  const feedback: string = props.serverResponse.llm_guidance;
  return (
    <Markdown className='prose dark:prose-invert max-w-5xl'>{feedback}</Markdown>
  )
}