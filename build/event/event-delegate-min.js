/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-delegate",function(g){var d=g.Array,b=g.Lang,a=b.isString,f=g.Selector.test,c=g.Env.evt.handles;function e(q,s,j,i){var o=d(arguments,0,true),p=a(j)?j:null,n=q.split(/\|/),l,h,k,r,m;if(n.length>1){r=n.shift();q=n.shift();}l=g.Node.DOM_EVENTS[q];if(b.isObject(l)&&l.delegate){m=l.delegate.apply(l,arguments);}if(!m){if(!q||!s||!j||!i){return;}h=(p)?g.Selector.query(p,null,true):j;if(!h&&a(j)){m=g.on("available",function(){g.mix(m,g.delegate.apply(g,o),true);},j);}if(!m&&h){o.splice(2,2,h);m=g.Event._attach(o,{facade:false});m.sub.filter=i;m.sub._notify=e.notifySub;}}if(m&&r){k=c[r]||(c[r]={});k=k[q]||(k[q]=[]);k.push(m);}return m;}e.notifySub=function(p,k,o){k=k.slice();if(this.args){k.push.apply(k,this.args);}var n=e._applyFilter(this.filter,k,o),m,l,h,j;if(n){n=d(n);m=k[0]=new g.DOMEventFacade(k[0],o.el,o);m.container=g.one(o.el);for(l=0,h=n.length;l<h&&!m.stopped;++l){m.currentTarget=g.one(n[l]);j=this.fn.apply(this.context||m.currentTarget,k);if(j===false){break;}}return j;}};e.compileFilter=g.cached(function(h){return function(j,i){return f(j._node,h,i.currentTarget._node);};});e._applyFilter=function(k,j,n){var m=j[0],h=n.el,l=m.target||m.srcElement,i=[];if(l.nodeType===3){l=l.parentNode;}j.unshift(l);if(a(k)){while(l&&l!==h){if(f(l,k,h)){i.push(l);}l=l.parentNode;}}else{j[0]=g.one(l);j[1]=new g.DOMEventFacade(m,h,n);while(l&&l!==h){if(k.apply(j[0],j)){i.push(l);}l=l.parentNode;j[0]=g.one(l);}j[1]=m;}if(i.length<=1){i=i[0];}j.shift();return i;};g.delegate=g.Event.delegate=e;},"3.2.0",{requires:["node-base"]});