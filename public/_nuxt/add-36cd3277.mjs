import{u as s,_ as x,a as m,b as u,o as l,c as i,d as n,w as p,v as _,e as v,f as A}from"./entry-ae4777a1.mjs";const P=()=>s("counter",()=>""),S=()=>s("uid",()=>""),y={setup(f,{expose:t}){t();const d=m(),e=u(),r=s("selectedAdd",()=>"Timeline"),a=s("tName",()=>""),o=s("pName",()=>""),N=S(),k=P();function T(){e.addPerson(o.value)}async function b(){d.addTimeline(a.value)}const c={timelineStore:d,peopleStore:e,selected:r,tName:a,pName:o,uid:N,token:k,pAdd:T,tAdd:b,axios:A,usePeopleStore:u,useTimelineStore:m};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}},B={class:"form"},C={class:"buttonRow"},V={key:0,class:"form"},w={key:1,class:"form"};function U(f,t,d,e,r,a){return l(),i("div",B,[n("div",C,[n("div",{class:"normalBtn",onClick:t[0]||(t[0]=o=>e.selected="Timeline")},"Timeline"),n("div",{class:"normalBtn",onClick:t[1]||(t[1]=o=>e.selected="Person")},"Person")]),e.selected==="Timeline"?(l(),i("div",V,[p(n("input",{type:"text",placeholder:"Name","onUpdate:modelValue":t[2]||(t[2]=o=>e.tName=o)},null,512),[[_,e.tName]]),n("div",{onClick:e.tAdd,class:"btn"},"Add Timeline")])):v("",!0),e.selected==="Person"?(l(),i("div",w,[p(n("input",{type:"text",placeholder:"Name","onUpdate:modelValue":t[3]||(t[3]=o=>e.pName=o)},null,512),[[_,e.pName]]),n("div",{onClick:e.pAdd,class:"btn"},"Add Person")])):v("",!0)])}var D=x(y,[["render",U],["__scopeId","data-v-2a63b456"]]);export{D as default};
