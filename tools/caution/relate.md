1.在文件 node_modules/relate-js/dist/index.js中修改
var relativeNodes = _normalize.relativeNodes;
为
var relativeNodes = _normalize.relativeNodes||[];

2.为了看到错误值，需要在doRequest的req.end的error中添加
console.error("[relate error]:", res.text);

