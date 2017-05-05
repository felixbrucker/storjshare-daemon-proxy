# storjshare-daemon-proxy

[![node](https://img.shields.io/node/v/storjshare-daemon-proxy.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/storjshare-daemon-proxy.svg?style=flat-square)](https://www.npmjs.com/package/storjshare-daemon-proxy)
[![license](https://img.shields.io/github/license/felixbrucker/storjshare-daemon-proxy.svg?style=flat-square)](https://raw.githubusercontent.com/felixbrucker/storjshare-daemon-proxy/master/LICENSE)

reverse proxy which makes storjshare-daemon api available via http with basic-auth

### Requests template:

#### Request:
```
POST /method
  {"param": any} - optional post data
```

#### Response:
```
{
  "result": Boolean,
  "error": String,
  "data": Object - optional if api returns something
}
```

### Example:

#### Request:
```
POST /restart
  {"param": "*"} - restarts all shares
```

#### Response:
```
{
  "result": true,
  "error": ""
}
```
