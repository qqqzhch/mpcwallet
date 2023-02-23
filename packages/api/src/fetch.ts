

import fetch from 'cross-fetch';

// export default function api<T>(url: string): Promise<T> {
  
//     return fetch(url)
//       .then((response:Response) => {
//         if (!response.ok) {
//           throw new Error(response.statusText)
//         }
//         return response.json()
//       })
//       .then((data:unknown)=>{
//         console.log( typeof data )
//         let result = data as T;
//         console.log( typeof result )
//         return result
//       })
      

//   }

  async function request<TResponse>(
    url: string, 
    config?: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, config);
    return await response.json();
  }

  const api = {
    get: <TResponse>(url: string) => 
      request<TResponse>(url),
    
    // Using `extends` to set a type constraint:
    post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) => 
      request<TResponse>(url, { method: 'POST', body }),
  }
  export default api