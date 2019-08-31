# Streaming Test


## Pre-requiremnts

- Node.js > 10.x
- OpenFaaS
- OpenFaas CLI
- Bash shell
 

## Function build and deployment 

```bash
export OPENFAAS_URL='http://0.0.0.0:8080'
faas template pull https://github.com/openfaas-incubator/node10-express-service 
faas build streamtest -yaml ./streamtest.yml --no-cache 
faas remove --yaml ./streamtest.yml
faas deploy streamtest --yaml ./streamtest.yml
```

## Test without OpenFaaS

The expected behaviour of the applicaton can be observed running it in isolation
(tested on Node.js 10.16.2):

Start by installing and starting the applicaton:
```bash
(cd build/streamtest/
npm install
node index.js)
```

The application can be tested (in a different shell) with cURL:
```bash
curl -XGET 'http://0.0.0.0:3000/'
```

The response should have a line every second, the whole sequence preceded by a "start" message and followed by an "end" message. 


## Test within OpenFaaS

After the successful deployment, you can test it with cURL:

```bash
export OPENFAAS_URL='http://0.0.0.0:8080'
curl -XGET "${OPENFAAS_URL}/function/streamtest"
```


## Test result

Despite being in streaming mode, the first part of the response is sent only after 10 seconds 
(when a timeout is triggered) and the rest of the response is not sent at all.


## Test different configuration within OpenFasS

Change the `./streamtest.yml` file to test with different combination of OF-Watchdog options ,
thebBuild and deploy the function:
```bash
export OPENFAAS_URL='http://0.0.0.0:8080'
faas build streamtest -yaml ./streamtest.yml --no-cache 
faas remove --yaml ./streamtest.yml
faas deploy streamtest --yaml ./streamtest.yml
```

After the successful deployment, you can test it with cURL:
```bash
curl -XGET "${OPENFAAS_URL}/function/streamtest"
```
