import{_,b as n,i as d,o as t,c as s,F as i,r as u,e as m,p as h,h as S,t as f,d as c}from"./entry-ae4777a1.mjs";const v={setup(e,{expose:p}){p();const a=n();d(async()=>{console.log("people mounted"),a.getPeople()});const o={peopleStore:a,usePeopleStore:n};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}},l=e=>(h("data-v-e80676ac"),e=e(),S(),e),y=l(()=>c("h1",null,"People",-1)),I={key:0},g=l(()=>c("h3",null,"There are no people!",-1)),k=[g];function P(e,p,a,o,b,x){return t(),s("div",null,[y,(t(!0),s(i,null,u(o.peopleStore.people,r=>(t(),s("div",{class:"listItem",key:r.name},f(r.name),1))),128)),o.peopleStore.people?m("",!0):(t(),s("div",I,k))])}var F=_(v,[["render",P],["__scopeId","data-v-e80676ac"]]);export{F as default};