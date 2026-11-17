"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { CONTACT, PORTRAIT, PROJECTS, SKILLS, SERVICES, GROW } from "@/lib/config";
const Scene = dynamic(() => import("./Scene"), { ssr: false });
const NAV = ["about","skills","work","grow","services","journey","contact"];
const ROLES=["Digital Marketer","Web Developer","Software Developer","Full Stack Developer"];
const reveal = { initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:"-80px"}, transition:{duration:.7} };

function Tilt({ children, className="" }) {
 const r = useRef();
 const move = e => { const b=r.current.getBoundingClientRect(), x=(e.clientX-b.left)/b.width-.5, y=(e.clientY-b.top)/b.height-.5;
  r.current.style.setProperty("--mx",(x+.5)*100+"%");r.current.style.setProperty("--my",(y+.5)*100+"%");r.current.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`; };
 return <div ref={r} className={className+" spot"} onMouseMove={move} onMouseLeave={()=>r.current.style.transform=""} style={{transition:"transform .15s"}}>{children}</div>;
}
function Magnetic({ children, href, cls }) {
 const r = useRef();
 const mv = e => { const b=r.current.getBoundingClientRect(); r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.25}px,${(e.clientY-b.top-b.height/2)*.35}px)`; };
 return <a ref={r} href={href} className={`btn ${cls}`} onMouseMove={mv} onMouseLeave={()=>r.current.style.transform=""}>{children}</a>;
}

const MQ=["Next.js","React","Node.js","MongoDB","SEO","Google Ads","Meta Ads","Performance Marketing","WordPress","UI/UX"];
function Marquee({items,cls=""}){const l=[...items,...items];return <div className={`overflow-hidden ${cls}`} aria-hidden="true"><div className="marq">{l.map((t,i)=><span key={i}>{t}<i/></span>)}</div></div>}
function Words({children,className=""}){return <h2 className={className} aria-label={String(children)}>{String(children).split(" ").map((w,i)=><span key={i} className="inline-block overflow-hidden align-bottom mr-[.25em] pb-[.1em]" aria-hidden="true"><motion.span className="inline-block" initial={{y:"110%"}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.7,delay:i*.07,ease:[.2,.7,.2,1]}}>{w}</motion.span></span>)}</h2>}
export default function Portfolio() {
 const [loaded,setLoaded]=useState(false), [reduced,setReduced]=useState(false), [imgOk,setImgOk]=useState(true);
 const hero=useRef(), portrait=useRef(), rail=useRef(), curs=useRef(), years=useRef();

 useEffect(()=>{
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches; setReduced(rm);
  const t=setTimeout(()=>setLoaded(true), rm?0:1400);
  let lenis, ctx, off=()=>{};
  (async()=>{
   const { gsap } = await import("gsap"); const { ScrollTrigger } = await import("gsap/ScrollTrigger"); gsap.registerPlugin(ScrollTrigger);
   if(!rm){ const Lenis=(await import("lenis")).default; lenis=new Lenis({lerp:.09}); lenis.on("scroll",ScrollTrigger.update);
    gsap.ticker.add(tm=>lenis.raf(tm*1000)); gsap.ticker.lagSmoothing(0); }
   ctx=gsap.context(()=>{
    if(!rm){
     // Hero -> About: portrait stays pinned, scales, tilts and drifts while text lags behind
     const tl=gsap.timeline({scrollTrigger:{trigger:hero.current,start:"top top",end:"+=120%",scrub:1,pin:true}});
     tl.to(portrait.current,{scale:1.35,rotateY:18,rotateZ:-4,y:60,ease:"none"},0)
       .to(".hero-text",{y:-120,opacity:0,ease:"none"},0).to(".hero-side",{y:-220,opacity:0,ease:"none"},0);
     // horizontal project gallery (desktop)
     if(matchMedia("(min-width:768px)").matches){ const w=()=>rail.current.scrollWidth-innerWidth;
      gsap.to(rail.current,{x:()=>-w(),ease:"none",scrollTrigger:{trigger:"#work",start:"top top",end:()=>"+="+w(),pin:true,scrub:1,invalidateOnRefresh:true}}); }
    }
    const o={v:0}; gsap.to(o,{v:2,duration:2,delay:1.4,onUpdate:()=>years.current&&(years.current.textContent=Math.round(o.v)+"+")});
   });
  })();
  const mv=e=>curs.current&&(curs.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);
  addEventListener("mousemove",mv); off=()=>removeEventListener("mousemove",mv);
  return()=>{clearTimeout(t);off();lenis?.destroy();ctx?.revert()};
 },[]);

 const {scrollYProgress}=useScroll(); const sx=useSpring(scrollYProgress,{stiffness:120,damping:25});
 const [pct,setPct]=useState(0); useEffect(()=>{const i=setInterval(()=>setPct(p=>Math.min(100,p+4)),50);return()=>clearInterval(i)},[]);
 const [role,setRole]=useState(0);
 useEffect(()=>{ if(matchMedia("(prefers-reduced-motion: reduce)").matches) return; const i=setInterval(()=>setRole(r=>(r+1)%ROLES.length),2600); return()=>clearInterval(i); },[]);
 const [form,setForm]=useState({name:"",email:"",type:"Website",message:""}), [err,setErr]=useState({}), [sent,setSent]=useState(false);
 const submit=e=>{e.preventDefault(); const x={};
  if(form.name.trim().length<2)x.name="Enter your name.";
  if(!/^\S+@\S+\.\S+$/.test(form.email))x.email="Enter a valid email address.";
  if(form.message.trim().length<10)x.message="Write at least 10 characters.";
  setErr(x); if(Object.keys(x).length)return;
  if(CONTACT.email){ location.href=`mailto:${CONTACT.email}?subject=${encodeURIComponent(form.type+" project from "+form.name)}&body=${encodeURIComponent(form.message+"\n\nReply to: "+form.email)}`; }
  setSent(true); };
 const links=[["Email",CONTACT.email&&`mailto:${CONTACT.email}`],["LinkedIn",CONTACT.linkedin],["GitHub",CONTACT.github],["WhatsApp",CONTACT.whatsapp&&`https://wa.me/${CONTACT.whatsapp}`]].filter(l=>l[1]);
 const field="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-mute";

 return (<>
  <div className="grid-bg"/><div className="aurora" aria-hidden="true"><i/><i/></div><motion.div style={{scaleX:sx}} className="fixed top-0 inset-x-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-volt to-viol"/><div ref={curs} className="cursor" aria-hidden="true"/>
  {!loaded&&<div className="fixed inset-0 z-[100] grid place-items-center bg-ink" role="status" aria-label="Loading"><div className="text-center"><p className="text-xl font-bold tracking-[.3em]">DEV RAJPUT</p><p className="gtext text-7xl font-extrabold mt-4 tabular-nums">{pct}</p><div className="mt-4 h-px w-48 bg-white/15 mx-auto"><div className="h-full bg-volt" style={{width:pct+"%"}}/></div></div></div>}

  <header className="fixed top-0 inset-x-0 z-50 glass !rounded-none px-5 py-3 flex justify-between items-center">
   <a href="#top" className="font-bold">DR</a>
   <nav aria-label="Main" className="hidden md:flex gap-6 text-sm text-mute">{NAV.map(n=><a key={n} href={`#${n}`} className="hover:text-white capitalize">{n}</a>)}</nav>
   <a href="#contact" className="btn btn-p !py-2 text-sm">Let&apos;s Connect</a>
  </header>

  <main id="top">
  <section ref={hero} className="relative min-h-screen overflow-hidden grid items-center px-5 pt-20" aria-label="Introduction">
   <div className="absolute inset-0 opacity-70"><Scene reduced={reduced}/></div>
   <div className="relative max-w-[1300px] mx-auto w-full grid lg:grid-cols-[1.2fr_1fr_.8fr] gap-8 items-center">
    <div className="hero-text">
     <p className="flex items-center gap-3 text-mute mb-5"><span className="dot"/>Available for new projects</p>
     <h1 className="h1" style={{fontSize:"clamp(2.6rem,6.5vw,5.5rem)"}}><span className="gtext">Hi, I&apos;m Dev.</span><br/><span className="text-mute">I am a</span></h1>
     <div className="relative mt-6 max-w-[560px]" style={{perspective:900}} aria-live="polite">
      <div className="flex justify-around px-6 -mb-3 relative z-10" aria-hidden="true">{Array.from({length:10}).map((_,i)=><span key={i} className="w-2 h-6 rounded-full border-2 border-zinc-400 bg-zinc-200"/>)}</div>
      <div className="relative h-[110px] sm:h-[130px] rounded-xl bg-[#f3f0ea] shadow-[6px_8px_0_#000,0_20px_50px_#4d7cff30] overflow-hidden">
       <AnimatePresence mode="wait"><motion.p key={role} initial={{rotateX:-90,opacity:0}} animate={{rotateX:0,opacity:1}} exit={{rotateX:90,opacity:0}} transition={{duration:.45}} style={{transformOrigin:"top"}}
        className="absolute inset-0 grid place-items-center text-ink font-extrabold tracking-tight text-[clamp(1.6rem,4.2vw,3rem)] px-4 text-center">{ROLES[role]}</motion.p></AnimatePresence>
       <span className="absolute bottom-2 right-3 text-xs text-zinc-500">{String(role+1).padStart(2,"0")} / {String(ROLES.length).padStart(2,"0")}</span>
      </div>
     </div>
     <p className="mt-6 text-mute max-w-md">Full Stack Developer & Digital Marketing Specialist. I build fast websites and the marketing that fills them with visitors.</p>
     <div className="mt-8 flex gap-4 flex-wrap"><Magnetic href="#work" cls="btn-p">Explore My Work</Magnetic><Magnetic href="#contact" cls="btn-g">Let&apos;s Connect</Magnetic></div>
    </div>
    <div className="grid place-items-center self-end relative" style={{perspective:1000}}>
     <div className="ring" aria-hidden="true"/>
     {[["Next.js",{top:"18%",left:"0%"}],["SEO",{top:"30%",right:"0%"}],["Google Ads",{top:"62%",left:"-2%"}],["React",{top:"72%",right:"4%"}]].map(([t,p],i)=><span key={t} className="orb glass hidden sm:block" style={{...p,animationDelay:`${i*-1.2}s`}}>{t}</span>)}
     <div ref={portrait} className="relative w-[min(78vw,400px)] aspect-[3/4]" style={{WebkitMaskImage:"linear-gradient(#000 70%,transparent)",maskImage:"linear-gradient(#000 70%,transparent)"}}>
      <div className="absolute inset-x-4 top-10 bottom-0 rounded-[40%] bg-gradient-to-b from-volt/40 to-viol/20 blur-3xl"/>
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-[#0d0d14] grid place-items-center text-6xl font-bold text-mute">
       DR{imgOk&&<Image src={PORTRAIT} alt="Portrait of Dev Rajput" fill priority sizes="400px" className="object-cover object-top grayscale-[.35] contrast-105" onError={()=>setImgOk(false)}/>}
      </div>
     </div>
    </div>
    <div className="hero-side flex lg:flex-col gap-3 flex-wrap">
     <div className="glass p-5"><p className="text-5xl font-bold" ref={years}>2+</p><p className="text-mute text-sm">Years in the industry</p></div>
     {["Next.js","SEO","Google Ads"].map(s=><span key={s} className="glass px-4 py-2 text-sm w-fit">{s}</span>)}
    </div>
   </div>
  </section>

  <Marquee items={MQ} cls="py-5 border-y border-white/10 text-mute text-lg"/>
  <section id="about" className="sec">
   <Words className="h2 max-w-3xl">Beyond Code, Beyond Marketing.</Words>
   <motion.p {...reveal} className="mt-8 text-mute text-lg max-w-2xl">I am Dev Rajput, a Full Stack Developer and Digital Marketing Specialist with 2 years of industry experience. I build modern, scalable, high-performance websites and help businesses grow through SEO, paid advertising, and performance-driven campaigns. I combine creative design, technical development, and marketing strategy to turn ideas into impactful digital experiences.</motion.p>
   <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {["2+ Years of Experience","Full Stack Development","Digital Marketing","Business Growth Strategies"].map(t=><Tilt key={t} className="glass p-6 font-semibold">{t}</Tilt>)}
   </div>
  </section>

  <section id="skills" className="sec">
   <Words className="h2">Skills & Expertise</Words>
   <div className="mt-12 grid md:grid-cols-2 gap-6">
    {Object.entries(SKILLS).map(([g,list])=><Tilt key={g} className="glass p-6"><h3 className="text-xl font-semibold mb-4">{g}</h3>
     <ul className="flex flex-wrap gap-2">{list.map(s=><li key={s} className="px-3 py-1.5 rounded-full border border-white/15 text-sm text-mute hover:text-white hover:border-volt transition">{s}</li>)}</ul></Tilt>)}
   </div>
  </section>

  <section id="work" className="min-h-screen py-24 flex flex-col justify-center">
   <h2 className="h2 px-5 max-w-[1200px] mx-auto w-full mb-10">Featured Work</h2>
   <div ref={rail} className="rail max-md:!flex-col max-md:!w-auto">
    {PROJECTS.map(p=><Tilt key={p.name} className={`glass card group ${p.own?"!border-volt":""}`}>
     <div className="aspect-video rounded-xl bg-gradient-to-br from-volt/30 to-viol/30 relative overflow-hidden grid place-items-center text-mute text-sm">
      {p.image?<Image src={p.image} alt={`${p.name} website preview`} fill sizes="420px" className="object-cover object-top transition duration-700 group-hover:scale-110"/>:new URL(p.url).hostname}</div>
     <h3 className="mt-4 text-xl font-semibold">{p.name}</h3>{p.own&&<p className="text-volt text-sm">My own business</p>}
     <p className="mt-2 text-mute text-sm">{p.overview}</p>
     <p className="mt-2 text-sm"><b>Contribution:</b> <span className="text-mute">{p.contribution}</span></p>
     {p.tech.length>0&&<p className="mt-2 text-sm"><b>Tech:</b> <span className="text-mute">{p.tech.join(", ")}</span></p>}
     <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-p mt-4 text-sm">View Live Website</a>
    </Tilt>)}
   </div>
  </section>

  <section id="grow" className="sec">
   <div className="glass p-8 md:p-14 bg-gradient-to-br from-volt/15 to-viol/15">
    <p className="text-mute">My business</p><h2 className="h2 mt-2">Grow Development</h2>
    <p className="mt-4 text-xl text-mute">Building Digital Experiences. Accelerating Business Growth.</p>
    <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{GROW.map(s=><li key={s} className="glass px-4 py-3 text-sm">{s}</li>)}</ul>
    <a href="https://www.growdevelopment.in/" target="_blank" rel="noopener noreferrer" className="btn btn-p mt-8">Visit Grow Development</a>
   </div>
  </section>

  <section id="services" className="sec">
   <Words className="h2">Services</Words>
   <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {SERVICES.map(([t,d])=><Tilt key={t} className="glass p-6"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-volt to-viol mb-4" aria-hidden="true"/><h3 className="font-semibold">{t}</h3><p className="text-mute text-sm mt-2">{d}</p></Tilt>)}
   </div>
  </section>

  <section id="journey" className="sec">
   <Words className="h2">Experience & Journey</Words>
   <motion.div {...reveal} className="mt-12 border-l border-white/20 pl-8 relative max-w-2xl">
    <span className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-volt shadow-[0_0_20px_#4D7CFF]"/>
    <p className="font-semibold">2024 – Present</p>
    <p className="text-mute mt-2">Building digital experiences, developing websites, applying modern development technologies, and working on digital marketing projects. 2+ years of industry experience.</p>
   </motion.div>
  </section>

  <section id="contact" className="sec">
   <h2 className="h2">Have a Project in Mind?</h2><p className="mt-4 text-mute text-lg">Let&apos;s build something extraordinary together.</p>
   <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-8">
    <form onSubmit={submit} noValidate className="glass p-6 grid gap-4">
     {[["name","Name","text"],["email","Email","email"]].map(([k,l,t])=><label key={k} className="grid gap-1 text-sm">{l}
      <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className={field} aria-invalid={!!err[k]}/>{err[k]&&<span role="alert" className="text-red-400">{err[k]}</span>}</label>)}
     <label className="grid gap-1 text-sm">Project type
      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className={field}>{["Website","E-commerce","Web application","SEO","Paid ads","Other"].map(o=><option key={o} className="bg-black">{o}</option>)}</select></label>
     <label className="grid gap-1 text-sm">Message
      <textarea rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={field} aria-invalid={!!err.message}/>{err.message&&<span role="alert" className="text-red-400">{err.message}</span>}</label>
     <button className="btn btn-p w-fit">Send Message</button>
     {sent&&<p role="status" className="text-green-400 text-sm">{CONTACT.email?"Your email app should open with the message ready to send.":"Form is valid. Add your email in lib/config.js to deliver messages."}</p>}
    </form>
    <div className="glass p-6 h-fit"><h3 className="font-semibold mb-4">Reach me directly</h3>
     {links.length?<ul className="grid gap-3">{links.map(([l,h])=><li key={l}><a className="text-volt hover:underline" href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul>
     :<p className="text-mute text-sm">Add your email, LinkedIn, GitHub and WhatsApp in lib/config.js and they appear here.</p>}</div>
   </div>
  </section>
  <Marquee items={["LET'S BUILD","SOMETHING EXTRAORDINARY"]} cls="outline text-[clamp(3rem,10vw,8rem)] font-extrabold py-10"/>
  </main>
  <footer className="text-center text-mute text-sm py-10">© {new Date().getFullYear()} Dev Rajput · Founder, Grow Development</footer>
 </>);
}
