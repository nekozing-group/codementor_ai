'use server'

const isInK8s = Boolean(process.env.KUBERNETES_SERVICE_HOST);

const isOffline = Boolean(process.env.CODEMENTOR_OFFLINE)

function getServerUrl(): string {
  if (isInK8s) {
    console.log('in kubernetes environment...');
    return 'http://autograder-service:8001'
  } else {
    console.log('in host environment...');
    return 'http://127.0.0.1:8000';
  }
}

export async function submitCode(formData: FormData) {
  if (isOffline) {
    return {"session_id":"session_id_mock","error":null,"llm_guidance":"this is something llm said","test_results":{"session_id":"session_id_mock","test_outputs":[{"test_pass":true,"error_message":null,"input":5,"actual_output":5,"expected_output":5},{"test_pass":false,"error_message":"mock error message","input":6,"actual_output":5,"expected_output":6}],"num_total_tests":2,"num_tests_passed":1}};
  }


  const code = formData.get('code');
  const problemId = formData.get('problemId')
  const url = `${getServerUrl()}/grade/${problemId}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store', // TODO reevaluate
      body: JSON.stringify({ 'code': code })
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }
    
    const data = await response.json();
    console.log('Success:', data);

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getProblemStatement(problemId: string): Promise<string> {
  if (isOffline) {
    return 'mock_problem_statement';
  }

  try {
    const response = await fetch(`${getServerUrl()}/problems/${problemId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }
    const data = await response.json();
    console.log('Success:', data);
    return data.problem_statement;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getProblemList(): Promise<string[]> {
  if (isOffline) {
    return ['a', 'b', 'c'];
  }

  try {
    const response = await fetch(`${getServerUrl()}/problems`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }
    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}