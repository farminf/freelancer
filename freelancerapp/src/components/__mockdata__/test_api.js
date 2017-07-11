const fs = require('fs')

const test_api = (url) => new Promise((resolve, reject) => {
   const lastSlash = url.lastIndexOf('/')
   const api_function = url.substring(lastSlash + 1)
   if(api_function === 'items'){
        // Load user json data from a file in subfolder for mock data
        fs.readFile(`./src/api/__mockdata__/items.json`, 'utf8', (err, data) => {
          if (err) reject(err)
          // Parse the data as JSON and put in the key entity
          resolve( JSON.parse(data) )
        })
   }else if(api_function === 'projects'){
        // Load user json data from a file in subfolder for mock data
        fs.readFile(`./src/api/__mockdata__/projects.json`, 'utf8', (err, data) => {
          if (err) reject(err)
          // Parse the data as JSON and put in the key entity
          resolve( JSON.parse(data) )
        })
   }else{
      resolve( JSON.parse({}) )
   }
  
})

export default test_api