import{_ as u,u as i,g as p,o as _,c as m,w as d,v as c,d as n,p as v,h as f,n as w}from"./entry-ae4777a1.mjs";const g={setup(a,{expose:o}){o();const t=i("email",()=>""),e=i("password",()=>""),l=p();async function r(){(await l.login(t.value,e.value)).error===null&&(t.value="",e.value="",w("/timelines"))}const s={email:t,password:e,options:l,login:r,useOptionsStore:p};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}},S=a=>(v("data-v-77a0315c"),a=a(),f(),a),h={class:"form"},x=S(()=>n("h1",null,"Login",-1));function y(a,o,t,e,l,r){return _(),m("div",h,[x,d(n("input",{type:"text",placeholder:"Email","onUpdate:modelValue":o[0]||(o[0]=s=>e.email=s)},null,512),[[c,e.email]]),d(n("input",{type:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=s=>e.password=s)},null,512),[[c,e.password]]),n("div",{onClick:e.login,class:"btn"},"Login")])}var k=u(g,[["render",y],["__scopeId","data-v-77a0315c"]]);export{k as default};
