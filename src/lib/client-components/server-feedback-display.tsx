'use client'

import Markdown from "react-markdown";

interface Props {
  serverResponse: any;
}
export default function ServerFeedbackDisplay(props: Props) {
  const llm_guidance: string = props.serverResponse.llm_guidance;
  return (
    <Markdown className='prose dark:prose-invert max-w-5xl'>{llm_guidance}</Markdown>
  )
}