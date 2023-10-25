'use server'

export async function submit_code(formData: FormData) {
  const code = formData.get('code');

  try {
    const response = await fetch('http://127.0.0.1:8000/grade/hello_world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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

