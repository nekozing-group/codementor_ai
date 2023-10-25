'use server'

export async function submit_code(prevState: any, formData: FormData) {
  const code = formData.get('code');
  await fetch('http://127.0.0.1:8000/grade/hello_world', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'code': code })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}