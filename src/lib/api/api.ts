
export function post(url: string, data: any): Promise<any> {
    
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const dataPromise = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, options).then((response) => {
      return response.json();
    });
    return dataPromise;
  }
  
  export function get(url: string,  data: any): Promise<any> {
  
      const options = {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
        },
      };
      const dataPromise = fetch(url, options).then((response) => {
        return response.json();
      });
      return dataPromise;
  
  }
  