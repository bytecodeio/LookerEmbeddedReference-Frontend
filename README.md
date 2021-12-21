

# Looker Embedded Reference - Frontend 

 Example of embedded Looker components.
 
## Installation
* Clone or download a copy of this template to your development machine.
* Navigate (cd) to the template directory on your system.
* Install the dependencies with Yarn.

```
yarn install
```
You may need to update your Node version or use a Node version manager to change your Node version.
  
#### Environmental varaibles

These can be set in an .env file or in the envornment directly using export envir_var=value, etc.

```
PBL_PORT=3001  # Note different port from backend 
API_HOST=http://localhost:3000
LOOKER_HOST=https://bytecodeef.looker.com
LOOKER_API_HOST=https://bytecodeef.looker.com:19999
LOOKERSDK_EMBED_HOST=https://example.looker.com
```

### Start the dev server

```
yarn dev 
```

### Point a browser to:
```
http://localhost:3001/embed-dashboard  # Update PORT 3001 to Environmental variable set with PBL_PORT if different
``` 

## Documentation


### Other resources:

[Looker API & Embedded Ref ](https://docs.looker.com/reference/api-embedding-intro)