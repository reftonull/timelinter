import{_ as f,u as r,o as m,c as g,w as c,v as p,d as o,h as w,t as u,f as _,p as h,i as y}from"./entry-90740ebb.mjs";const S={setup(t,{expose:s}){s();const i=r("emailReg",()=>""),e=r("passwordReg",()=>""),n=r("err",()=>""),l=r("success",()=>"");async function a(){try{const v=await _.post("/api/register",{email:i.value,password:e.value});l.value="Registration succeeded"}catch{n.value="Registration failed"}}const d={email:i,password:e,err:n,success:l,register:a,axios:_};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}},R=t=>(h("data-v-008f1a64"),t=t(),y(),t),x={class:"form"},I=R(()=>o("h1",null,"Register",-1)),b={class:"error"},k={class:"success"};function B(t,s,i,e,n,l){return m(),g("div",x,[I,c(o("input",{type:"text",placeholder:"Email","onUpdate:modelValue":s[0]||(s[0]=a=>e.email=a)},null,512),[[p,e.email]]),c(o("input",{onKeyup:s[1]||(s[1]=w((...a)=>t.login&&t.login(...a),["enter"])),type:"password",placeholder:"Password","onUpdate:modelValue":s[2]||(s[2]=a=>e.password=a)},null,544),[[p,e.password]]),o("div",{onClick:e.register,class:"btn"},"Register"),o("div",b,u(e.err),1),o("div",k,u(e.success),1)])}var D=f(S,[["render",B],["__scopeId","data-v-008f1a64"]]);export{D as default};