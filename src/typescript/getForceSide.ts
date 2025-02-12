
const Body = {
  "jsonrpc": "2.0",
    "method": "generateIntegers",
    "params": {
        "apiKey": "d9b15e24-43cf-4339-988b-5de19106c02f", // Random.org API key https://api.random.org/dashboard
        "n": 1,
        "min": 0,
        "max": 100,
        "replacement": true
    },
    "id": 1
};

const getRandomNumber = async (): Promise<number | null> => {
  const URL = 'https://api.random.org/json-rpc/1/invoke'; // https://api.random.org/json-rpc/1/invoke
  const response = await fetch(URL, {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(Body)
  });
  const data = await response.json();
  return data.result.random.data[0]
}

export const getForceSide = async (): Promise<string | undefined> => {
  let num: number | null;
  do {
    num = await getRandomNumber()
  } while ( num === 0 );

  if (num) {

    switch (true) {

      case num === 1:
        console.log('unique')
        return 'unique';

      case 1 < num && num <= 49:
        console.log('sith')
        return 'sith';
    
      default: 
        console.log('jedi')
        return 'jedi';
    };
  };
};