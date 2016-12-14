define(["jquery","text!oauth/app_id.json","common/util"],function(a,b){function c(){var a=JSON.parse(b),c=local_storage.get("config"),d=c&&c.app_id||"";if(!d){var e=window.location.href;for(var f in a)if(0==e.lastIndexOf(f,0)){d=a[f];break}}return d}var d=!1,e=null,f=c(),g=function(){var b=local_storage.get("config"),c=(local_storage.get("i18n")||{value:"en"}).value,d=(b&&b.websocket_url||"wss://ws.binaryws.com/websockets/v3?l="+c)+"&app_id="+f,e=new WebSocket(d);return e.addEventListener("open",o),e.addEventListener("close",h),e.addEventListener("message",p),e.addEventListener("error",function(){a.growl.error({message:"Connection error. Refresh the page.".i18n().i18n()})}),e},h=function(){d=!1,w("logout"),setTimeout(function(){e=g(),local_storage.get("oauth")&&B.cached.authorize(),require(["charts/chartingRequestMap"],function(a){Object.keys(a).forEach(function(b){var c=a[b];c&&c.symbol&&!c.timerHandler&&a.register({symbol:c.symbol,granularity:c.granularity,subscribe:1,count:1,style:c.granularity>0?"candles":"ticks"})["catch"](function(a){})})})},1e3)},i={},j=[],k=[],l={},m={},n=function(){return e&&1===e.readyState},o=function(){for(;k.length>0;){var a=k.shift();l[a.req_id]||e.send(JSON.stringify(a))}for(var b in l){var c=l[b];c&&(c.sent_before?c.reject({message:"Connection closed.".i18n()}):(c.sent_before=!0,e.send(JSON.stringify(c.data))))}for(;j.length>0;)j.shift()()},p=function(a){var b=JSON.parse(a.data);(i[b.msg_type]||[]).forEach(function(a){setTimeout(function(){a(b)},0)});var c=b.req_id,d=l[c];d&&(delete l[c],b.error?(b.error.echo_req=b.echo_req,b.error.req_id=b.req_id,d.reject(b.error)):d.resolve(b))};e=g(),require(["websockets/stream_handler"]);var q=function(a){for(var b in{balance:1,statement:1,profit_table:1,portfolio:1,proposal_open_contract:1,buy:1,sell:1,get_self_exclusion:1,set_self_exclusion:1})if(b in a)return!0;return!1},r=0,s=function(a){return a.req_id=++r,new Promise(function(b,c){l[a.req_id]={resolve:b,reject:c,data:a},n()?e.send(JSON.stringify(a)):k.push(a)})},t=function(a){var b=!1,c={authorize:a},e=JSON.stringify(c),f=s(c);return f.then(function(a){d=!0,local_storage.set("authorize",a.authorize);var g=-1!==a.authorize.landing_company_name.indexOf("japan");if(g||w("login",a),local_storage.get("oauth-login")){var h=local_storage.get("oauth-login").value;local_storage.remove("oauth-login"),h&&!g&&w("oauth-login",a)}return b=!0,m[e]={data:c,promise:f},a})["catch"](function(a){throw"SelfExclusion"===a.code||b||(d=!1,w("logout"),local_storage.remove("oauth")),delete m[e],a})},u=function(){local_storage.remove("oauth"),local_storage.remove("authorize"),B.send({logout:1})["catch"](function(b){a.growl.error({message:b.message}),e.close()});for(var b in m)(q(m[b].data)||"authorize"in m[b].data)&&delete m[b]},v=function(a){if(d)return s(a);var b=s.bind(null,a);if(local_storage.get("oauth")){var c=local_storage.get("oauth"),e=c[0].token;return t(e).then(b)}return Promise.reject({message:"Please log in".i18n()})},w=function(a){var b=[].slice.call(arguments,1),c=i[a]||[];c.forEach(function(a){setTimeout(function(){a.apply(void 0,b)},0)})},x=function(a,b){setTimeout(function(){var b=l[a];b&&(delete l[a],b.reject({message:"Timeout for websocket request".i18n()}))},b)},y={},z={},A={},B={events:{on:function(a,b){return(i[a]=i[a]||[]).push(b),b},off:function(a,b){if(i[a]){var c=i[a].indexOf(b);-1!==c&&i[a].splice(c,1)}},on_till:function(a,b){var c=function(){var d=b.apply(this,arguments);d&&B.events.off(a,c)};B.events.on(a,c)}},proposal_open_contract:{subscribe:function(a){if(z[a]&&z[a].subscribers>0)return z[a].subscribers++,z[a].promise;var b=B.send({proposal_open_contract:1,contract_id:a,subscribe:1}).then(function(b){return z[a].stream_id=b.proposal_open_contract.id,b})["catch"](function(b){throw z[a]=void 0,b});return z[a]={subscribers:1,promise:b},b},forget:function(a){var b=z[a],c=A[a];if(!b)return c||Promise.resolve();if(0==b.subscribers)return c;if(b.subscribers--,b.subscribers>0)return Promise.resolve();var d=function(){return z[a]=void 0,B.send({forget:b.stream_id})["catch"](function(b){throw A[a]=void 0,b}).then(function(b){return A[a]=void 0,b})};return A[a]=b.stream_id?d():b.promise["catch"](function(){}).then(function(){return b.stream_id?d():void 0}),A[a]}},execute:function(a){n()?setTimeout(a,0):j.push(a)},invalidate:u,switch_account:function(a){var b=local_storage.get("oauth");if(!b)return Promise.reject({message:"Account token not found.".i18n()});var c=b.map(function(a){return a.id}).indexOf(a);if(-1===c)return promise.reject({message:"Account id not found.".i18n()});var e=b[c];b.splice(c,1),b.unshift(e),local_storage.set("oauth",b);for(var f in m)(q(m[f].data)||"authorize"in m[f].data)&&delete m[f];return d=!1,B.send({forget_all:"transaction"})["catch"](function(a){}),B.send({forget_all:"balance"})["catch"](function(a){}),B.cached.authorize()},cached:{send:function(a){var b=JSON.stringify(a);return m[b]?m[b].promise:(m[b]={data:a,promise:null},m[b].promise=B.send(a).then(function(a){return a},function(a){throw delete m[b],a}))},authorize:function(){var a=local_storage.get("oauth"),b=a&&a[0]&&a[0].token,c=JSON.stringify({authorize:b});return d&&b&&m[c]?m[c].promise:b?t(b):Promise.reject("Please log in.".i18n())}},send:function(a,b){if(a&&q(a))return v(a);var c=s(a);return b&&x(a.req_id,b),c},is_authenticated:function(){return d},sell_expired:function(a){var b=(new Date).getTime()/1e3|0;a=a||b+1,!y[a]&&1*a>b&&(y[a]=setTimeout(function(){y[a]=void 0,B.send({sell_expired:1})["catch"](function(a){})},1e3*(a+2-b)))},app_id:f};return B.events.on("login",function(){B.send({transaction:1,subscribe:1})["catch"](function(a){}),B.send({balance:1,subscribe:1})["catch"](function(a){})}),B});