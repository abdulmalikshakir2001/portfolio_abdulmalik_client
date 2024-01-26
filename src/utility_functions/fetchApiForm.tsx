export function fetchApiForm( url:string,method:string,data:any):Promise<any>{
      const options = {
        method: method,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: data,
      };
      const dataPromise =  fetch(url, options)
      .then((response) => {
        return response.json();
      })
      return dataPromise;
    
    
      }