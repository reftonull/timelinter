import{_,u as p,o as u,c as m,w as d,v as n,d as t,f as c,p as f,h as v}from"./entry-894a6d49.mjs";const w={setup(a,{expose:s}){s();const r=p("emailReg",()=>""),e=p("passwordReg",()=>"");async function i(){const o=await c.post("/api/register",{email:r.value,password:e.value});console.log(o.data)}const l={email:r,password:e,register:i,axios:c};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}},g=a=>(f("data-v-09fc73a8"),a=a(),v(),a),h={class:"form"},x=g(()=>t("h1",null,"Register",-1));function S(a,s,r,e,i,l){return u(),m("div",h,[x,d(t("input",{type:"text",placeholder:"Email","onUpdate:modelValue":s[0]||(s[0]=o=>e.email=o)},null,512),[[n,e.email]]),d(t("input",{type:"password",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=o=>e.password=o)},null,512),[[n,e.password]]),t("div",{onClick:e.register,class:"btn"},"Register")])}var I=_(w,[["render",S],["__scopeId","data-v-09fc73a8"]]);export{I as default};