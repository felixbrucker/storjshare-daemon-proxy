# storjshare-daemon-proxy

[![node](https://img.shields.io/node/v/storjshare-daemon-proxy.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/storjshare-daemon-proxy.svg?style=flat-square)](https://www.npmjs.com/package/storjshare-daemon-proxy)
[![license](https://img.shields.io/github/license/felixbrucker/storjshare-daemon-proxy.svg?style=flat-square)](https://raw.githubusercontent.com/felixbrucker/storjshare-daemon-proxy/master/LICENSE)

reverse proxy which makes storjshare status api response available via http with basic-auth

### Requests template:

#### Request:
```
GET /status
```

#### Response:
```
{
  "result": Boolean,
  "error": String,
  "data": Object - optional if api returns something
}
```
