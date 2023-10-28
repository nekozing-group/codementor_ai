'use server'

const isInK8s = Boolean(process.env.KUBERNETES_SERVICE_HOST);

function getServerUrl(): string {
  if (isInK8s) {
    console.log('in kubernetes environment...');
    return 'http://autograder-service:8001/grade/hello_world'
  } else {
    console.log('in host environment...');
    return 'http://127.0.0.1:8000/grade/hello_world';
  }
}

export async function submit_code(formData: FormData) {
  const code = formData.get('code');
  const url = getServerUrl();
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

