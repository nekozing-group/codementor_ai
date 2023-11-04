'use client'

import Markdown from "react-markdown";

interface Props {
  serverResponse: any;
}

interface TestOutput {
  test_pass: boolean,
  error_message?: string,
  input: any,
  actual_output: any,
  expected_output: any
}

interface TestResults {
  session_id: string,
  test_outputs: TestOutput[]
}

interface ServerResponse {
  session_id: string,
  error?: string,
  llm_guidance?: string,
  test_results: TestResults
}

export default function ServerFeedbackDisplay(props: Props) {
  if (!props.serverResponse) {
    return;
  }
  const serverResponse = props.serverResponse as ServerResponse;
  let llm_guidance: string = '';
  if (serverResponse.llm_guidance) {
    llm_guidance = serverResponse.llm_guidance;
  }
  const testOutputs: TestOutput[] = serverResponse.test_results.test_outputs;
  return (
    <div>
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        
        <Markdown className='prose dark:prose-invert max-w-5xl text-info-content'>{llm_guidance}</Markdown>
    </div>
      
      {
        testOutputs.map((singleResult: any) => {
          const testPass = singleResult.test_pass;
            if (testPass) {
              return (
                // <div className="card w-auto bg-success shadow-xl card-compact">
                //   <div className="card-body text-success-content">
                //     <p></p>
                //     <p>input: {singleResult.input}</p>
                //     <p>expected: {singleResult.expected_output}</p>
                //     <p>actual: {singleResult.actual_output}</p>
                //   </div>
                // </div>

                <div className="collapse collapse-arrow w-auto bg-success text-success-content">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-xl font-medium">
                    PASS
                  </div>
                  <div className="collapse-content"> 
                    <p>Test Input: {singleResult.input }</p>
                    <p>Expected Output: { singleResult.expected_output}</p>
                    <p>Your Output: { singleResult.actual_output }</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="collapse collapse-arrow w-auto bg-error text-error-content">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-xl font-medium">
                    FAIL
                  </div>
                  <div className="collapse-content"> 
                    <p>Test Input: {singleResult.input }</p>
                    <p>Expected Output: { singleResult.expected_output}</p>
                    <p>Your Output: { singleResult.actual_output }</p>
                  </div>
                </div>
              )
            }
          })
      }
      
    </div>
  )
}