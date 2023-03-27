import express from 'express'
import product from './api/product'
import fs from 'fs'
require('isomorphic-fetch');

const app = express()
app.use(express.json())
const port = 3004

function wait(ms:number) {
  return new Promise(resolve =>setTimeout(() =>resolve(ms), ms));
};

export interface QueryPayload {
  payload: string
}

app.use((_req: any, res: { setHeader: (arg0: string, arg1: string) => void }, next: () => void) => {
  // Allow any website to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  console.log("- -")
  // Continue to next middleware
  next()
})

app.use('/api/product', product)

app.get('/', (_req: any, res: { json: (arg0: QueryPayload) => void }) => {
  const responseData: QueryPayload = { payload: 'Hi there, yo!' }

  res.json(responseData)
})
app.post('/api', async (_req: any, res: any) => {
  console.log('_req.body', _req.body)
  let method = _req.body.method
  let jsondata;

  console.log(method)
  let list =["smw_keygen","smw_getGroupID",'smw_getReqAddrStatus','smw_getAccountList']
  const filestate = fs.existsSync(__dirname + `/mock/${method}.json`);
  
  if (filestate) {
    jsondata = await fs.readFileSync(__dirname + `/mock/${method}.json`, 'utf8')
    jsondata=JSON.parse(jsondata)
    jsondata.id=_req.body.id
  } else {
    console.log('need mock ',method)
    const response = await fetch('http://43.157.49.23:5928', {
      method: 'post',
      body: JSON.stringify(_req.body),
      headers: { 'Content-Type': 'application/json' }
    });
    jsondata = await response.text();
    jsondata=JSON.parse(jsondata)
  }
  if(method=="smw_getGroupId"){
    // res.status(500);
    // jsondata.result.Status="error"
    wait(1000*10)
  }
  




  res.json(jsondata)
  
})

// app.listen(port,'0.0.0.0',() => console.log(`Example app listening at http://localhost:${port}`))
app.listen(port,() => console.log(`Example app listening at http://localhost:${port}`))
