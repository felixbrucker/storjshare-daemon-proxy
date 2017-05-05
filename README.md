# storjshare-daemon-proxy

requires nodejs

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
