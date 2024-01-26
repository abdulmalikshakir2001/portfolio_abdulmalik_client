export function fetchApi( url:string,method:string,data:any):Promise<any>{
  if(method.toLowerCase() === 'get'){
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    };
    const dataPromise =  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    return dataPromise;
  }
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const dataPromise =  fetch(url, options)
  .then((response) => {
    return response.json();
  })
  return dataPromise;



  }