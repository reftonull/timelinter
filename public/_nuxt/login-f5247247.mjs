import{_ as v,u as p,g as c,r as f,o as m,c as w,w as u,v as _,d as r,h as g,t as h,p as y,i as S,j as b}from"./entry-90740ebb.mjs";const x={setup(s,{expose:o}){o();const a=p("email",()=>""),e=p("password",()=>""),n=c(),l=f("");async function t(){const d=await n.login(a.value,e.value);d.error===null?(a.value="",e.value="",b("/timelines")):(a.value="",e.value="",l.value=d.error)}const i={email:a,password:e,options:n,err:l,login:t,useOptionsStore:c};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},I=s=>(y("data-v-b9fda112"),s=s(),S(),s),k={class:"form"},B=I(()=>r("h1",null,"Login",-1)),K=["onKeyup"],V={class:"error"};function j(s,o,a,e,n,l){return m(),w("div",k,[B,u(r("input",{type:"text",placeholder:"Email","onUpdate:modelValue":o[0]||(o[0]=t=>e.email=t)},null,512),[[_,e.email]]),u(r("input",{onKeyup:g(e.login,["enter"]),type:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=t=>e.password=t)},null,40,K),[[_,e.password]]),r("div",{onClick:e.login,class:"btn"},"Login"),r("div",V,h(e.err),1)])}var E=v(x,[["render",j],["__scopeId","data-v-b9fda112"]]);export{E as default};
