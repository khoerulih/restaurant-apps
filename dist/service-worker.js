if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=t(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-d9dff488"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"bundle.js",revision:"ad9cf2a2a64081561582d4645bd6306a"},{url:"index.html",revision:"5aa09fcd5580c569636c5bd249aecc33"},{url:"manifest.json",revision:"9575b3fad4edb4838d1b79eb0af93c82"},{url:"sw.js",revision:"1574e65b5b2f3e9970cd94272757a973"}],{}),e.registerRoute(/https:\/\/dicoding-restaurant-api.el.r.appspot.com/,new e.StaleWhileRevalidate,"GET")}));