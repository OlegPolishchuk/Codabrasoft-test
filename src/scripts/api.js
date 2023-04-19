const baseUrl = 'https://jsonplaceholder.typicode.com'

export const api = {
  sendForm(endpoint, data) {
    fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        console.log('body = ', data);
        console.log('result=> ', res);
      })
      .catch(error => console.log(error))
  }
}