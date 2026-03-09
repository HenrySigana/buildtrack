import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PHASES = [
  { id: "foundation", label: "Foundation", icon: "⬛", color: "#b45309" },
  { id: "framing",    label: "Framing",    icon: "🪵", color: "#92400e" },
  { id: "roofing",    label: "Roofing",    icon: "🏠", color: "#1d4ed8" },
  { id: "electrical", label: "Electrical", icon: "⚡", color: "#d97706" },
  { id: "plumbing",   label: "Plumbing",   icon: "🔧", color: "#0891b2" },
  { id: "interior",   label: "Interior",   icon: "🪟", color: "#7c3aed" },
  { id: "finishing",  label: "Finishing",  icon: "✨", color: "#059669" },
];

const initTasks = [
  { id:"T001", phase:"foundation", name:"Site clearing & excavation",   assignee:"John Kamau",    start:"2026-03-01", end:"2026-03-05", cost:45000,  status:"Done",        progress:100, priority:"High" },
  { id:"T002", phase:"foundation", name:"Footings & concrete pour",     assignee:"Peter Otieno",  start:"2026-03-06", end:"2026-03-12", cost:120000, status:"Done",        progress:100, priority:"High" },
  { id:"T003", phase:"foundation", name:"Foundation walls",             assignee:"John Kamau",    start:"2026-03-13", end:"2026-03-20", cost:85000,  status:"In Progress", progress:70,  priority:"High" },
  { id:"T004", phase:"framing",    name:"Wall framing & sheathing",     assignee:"Mike Waweru",   start:"2026-03-21", end:"2026-04-02", cost:95000,  status:"Pending",     progress:0,   priority:"High" },
  { id:"T005", phase:"framing",    name:"Window & door openings",       assignee:"Mike Waweru",   start:"2026-04-03", end:"2026-04-08", cost:35000,  status:"Pending",     progress:0,   priority:"Medium" },
  { id:"T006", phase:"roofing",    name:"Roof trusses installation",    assignee:"Grace Njeri",   start:"2026-04-09", end:"2026-04-15", cost:75000,  status:"Pending",     progress:0,   priority:"High" },
  { id:"T007", phase:"roofing",    name:"Roofing sheets & gutters",     assignee:"Grace Njeri",   start:"2026-04-16", end:"2026-04-22", cost:110000, status:"Pending",     progress:0,   priority:"High" },
  { id:"T008", phase:"electrical", name:"Rough-in wiring",             assignee:"Ali Hassan",    start:"2026-04-23", end:"2026-05-01", cost:65000,  status:"Pending",     progress:0,   priority:"Medium" },
  { id:"T009", phase:"plumbing",   name:"Rough-in plumbing",           assignee:"David Kiprop",  start:"2026-04-23", end:"2026-05-01", cost:55000,  status:"Pending",     progress:0,   priority:"Medium" },
  { id:"T010", phase:"interior",   name:"Drywall & plastering",        assignee:"Sarah Auma",    start:"2026-05-02", end:"2026-05-14", cost:80000,  status:"Pending",     progress:0,   priority:"Medium" },
  { id:"T011", phase:"interior",   name:"Tiling — floors & bathrooms", assignee:"Sarah Auma",    start:"2026-05-15", end:"2026-05-25", cost:95000,  status:"Pending",     progress:0,   priority:"Medium" },
  { id:"T012", phase:"finishing",  name:"Painting — interior",         assignee:"James Mutua",   start:"2026-05-26", end:"2026-06-04", cost:45000,  status:"Pending",     progress:0,   priority:"Low" },
  { id:"T013", phase:"finishing",  name:"Doors, windows & fixtures",   assignee:"James Mutua",   start:"2026-06-05", end:"2026-06-12", cost:120000, status:"Pending",     progress:0,   priority:"Low" },
  { id:"T014", phase:"finishing",  name:"Final inspection & handover", assignee:"John Kamau",    start:"2026-06-13", end:"2026-06-15", cost:10000,  status:"Pending",     progress:0,   priority:"High" },
];

const initBudget = [
  { id:"B001", category:"Materials",  allocated:800000, spent:320000 },
  { id:"B002", category:"Labour",     allocated:400000, spent:180000 },
  { id:"B003", category:"Equipment",  allocated:150000, spent:65000  },
  { id:"B004", category:"Permits",    allocated:50000,  spent:50000  },
  { id:"B005", category:"Contingency",allocated:100000, spent:12000  },
];

const initWorkers = [
  { id:"W001", name:"John Kamau",   role:"Site Foreman",      phone:"0712-111-222", status:"On Site",  rate:2500 },
  { id:"W002", name:"Peter Otieno", role:"Mason",             phone:"0723-222-333", status:"On Site",  rate:1800 },
  { id:"W003", name:"Mike Waweru",  role:"Carpenter",         phone:"0734-333-444", status:"On Site",  rate:2000 },
  { id:"W004", name:"Grace Njeri",  role:"Roofer",            phone:"0745-444-555", status:"Off Site", rate:2200 },
  { id:"W005", name:"Ali Hassan",   role:"Electrician",       phone:"0756-555-666", status:"Off Site", rate:2800 },
  { id:"W006", name:"David Kiprop", role:"Plumber",           phone:"0767-666-777", status:"Off Site", rate:2600 },
  { id:"W007", name:"Sarah Auma",   role:"Interior Finisher", phone:"0778-777-888", status:"Off Site", rate:1900 },
  { id:"W008", name:"James Mutua",  role:"Painter",           phone:"0789-888-999", status:"Off Site", rate:1700 },
];

const initMaterials = [
  { id:"M001", name:"Cement (bags)",      qty:450,  unit:"bags",   unitCost:900,   delivered:300, status:"Partial" },
  { id:"M002", name:"Steel Rebar",        qty:2000, unit:"kg",     unitCost:120,   delivered:2000,status:"Delivered" },
  { id:"M003", name:"Sand (tonnes)",      qty:30,   unit:"tonnes", unitCost:4500,  delivered:20,  status:"Partial" },
  { id:"M004", name:"Ballast (tonnes)",   qty:25,   unit:"tonnes", unitCost:5000,  delivered:25,  status:"Delivered" },
  { id:"M005", name:"Roofing Sheets",     qty:120,  unit:"pcs",    unitCost:1800,  delivered:0,   status:"Ordered" },
  { id:"M006", name:"Timber (pieces)",    qty:200,  unit:"pcs",    unitCost:850,   delivered:0,   status:"Pending" },
  { id:"M007", name:"Electrical Cable",   qty:500,  unit:"m",      unitCost:180,   delivered:0,   status:"Pending" },
  { id:"M008", name:"PVC Pipes",          qty:300,  unit:"m",      unitCost:95,    delivered:0,   status:"Pending" },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = p => p + Math.random().toString(36).slice(2,6).toUpperCase();
const SC = { "Done":"#10b981","In Progress":"#3b82f6","Pending":"#6b7280","Blocked":"#ef4444","On Site":"#10b981","Off Site":"#6b7280","Delivered":"#10b981","Partial":"#f59e0b","Ordered":"#3b82f6","High":"#ef4444","Medium":"#f59e0b","Low":"#10b981" };
const C = { bg:"#0c1117",surf:"#131920",surf2:"#1a2332",border:"#1e3048",text:"#e8f0fe",muted:"#7a99bb",dim:"#4a6a8a",amber:"#f59e0b",blue:"#3b82f6",green:"#10b981",red:"#ef4444",orange:"#f97316" };
const IS = { width:"100%",background:C.surf2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,padding:"9px 12px",fontSize:13,boxSizing:"border-box",outline:"none",fontFamily:"inherit" };

const Badge = ({t,small}) => <span style={{background:(SC[t]||"#4a6a8a")+"22",color:SC[t]||"#4a6a8a",border:`1px solid ${(SC[t]||"#4a6a8a")}44`,padding:small?"1px 7px":"2px 10px",borderRadius:99,fontSize:small?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{t}</span>;
const SVG = ({d,s=17}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const IC = {
  dash:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  tasks:"M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  budget:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 6v6l4 2",
  workers:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  materials:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  gantt:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  plus:"M12 5v14M5 12h14",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
  close:"M18 6L6 18M6 6l12 12",
  home:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  alert:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4M12 17h.01",
};

const Field = ({label,children}) => <div style={{marginBottom:12}}><label style={{display:"block",color:C.muted,fontSize:10,marginBottom:4,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</label>{children}</div>;
const Inp = p => <input style={IS} {...p}/>;
const Sel = ({children,...p}) => <select style={IS} {...p}>{children}</select>;
const BP = (col="#1d4ed8") => ({display:"flex",alignItems:"center",gap:6,background:col,color:"#fff",border:"none",borderRadius:8,padding:"8px 15px",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit"});

function Modal({title,onClose,children,wide}){
  return <div style={{position:"fixed",inset:0,background:"#000c",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
    <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:wide?700:480,maxHeight:"90vh",overflow:"auto",padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{margin:0,color:C.text,fontSize:16,fontFamily:"'Fraunces',serif"}}>{title}</h3>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><SVG d={IC.close}/></button>
      </div>
      {children}
    </div>
  </div>;
}

function ProgBar({pct,color="#3b82f6",h=6}){
  return <div style={{background:C.border,borderRadius:99,height:h,overflow:"hidden"}}>
    <div style={{background:color,width:`${Math.min(pct,100)}%`,height:"100%",borderRadius:99,transition:"width .4s"}}/>
  </div>;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({tasks,budget,workers,materials}){
  const done = tasks.filter(t=>t.status==="Done").length;
  const inProg = tasks.filter(t=>t.status==="In Progress").length;
  const totalBudget = budget.reduce((s,b)=>s+b.allocated,0);
  const totalSpent = budget.reduce((s,b)=>s+b.spent,0);
  const budgetPct = Math.round((totalSpent/totalBudget)*100);
  const onSite = workers.filter(w=>w.status==="On Site").length;
  const overallProgress = Math.round(tasks.reduce((s,t)=>s+t.progress,0)/tasks.length);
  const phaseProgress = PHASES.map(ph=>{
    const pts=tasks.filter(t=>t.phase===ph.id);
    return {...ph,pct:pts.length?Math.round(pts.reduce((s,t)=>s+t.progress,0)/pts.length):0};
  });

  return <div>
    <div style={{marginBottom:22}}>
      <h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:"0 0 3px",fontSize:24}}>Construction Dashboard</h2>
      <p style={{color:C.dim,margin:0,fontSize:12}}>Sigana Residence · Nairobi, Kenya · Started March 2026</p>
    </div>

    {/* Top Stats */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      {[
        {l:"Overall Progress",v:`${overallProgress}%`,sub:`${done}/${tasks.length} tasks done`,color:C.green},
        {l:"Budget Used",v:`${budgetPct}%`,sub:`KES ${(totalSpent/1000).toFixed(0)}K of ${(totalBudget/1000).toFixed(0)}K`,color:C.amber},
        {l:"Workers On Site",v:onSite,sub:`of ${workers.length} total`,color:C.blue},
        {l:"Active Tasks",v:inProg,sub:`${tasks.filter(t=>t.status==="Pending").length} pending`,color:C.orange},
      ].map(s=><div key={s.l} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{color:C.dim,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{s.l}</div>
        <div style={{color:s.color,fontSize:28,fontWeight:800,fontFamily:"'Fraunces',serif",lineHeight:1}}>{s.v}</div>
        <div style={{color:C.dim,fontSize:11,marginTop:4}}>{s.sub}</div>
      </div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {/* Phase progress */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
        <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:14}}>Construction Phases</div>
        {phaseProgress.map(ph=><div key={ph.id} style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:"#c8daf0",fontSize:12,fontWeight:600}}>{ph.icon} {ph.label}</span>
            <span style={{color:ph.color,fontSize:12,fontWeight:700}}>{ph.pct}%</span>
          </div>
          <ProgBar pct={ph.pct} color={ph.color} h={5}/>
        </div>)}
      </div>

      {/* Budget breakdown */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
        <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:14}}>Budget Breakdown</div>
        {budget.map(b=>{
          const pct=Math.round((b.spent/b.allocated)*100);
          return <div key={b.id} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{color:"#c8daf0",fontSize:12,fontWeight:600}}>{b.category}</span>
              <span style={{color:pct>90?C.red:pct>70?C.amber:C.green,fontSize:12,fontWeight:700}}>{pct}%</span>
            </div>
            <ProgBar pct={pct} color={pct>90?C.red:pct>70?C.amber:C.green} h={5}/>
            <div style={{color:C.dim,fontSize:10,marginTop:3}}>KES {b.spent.toLocaleString()} / {b.allocated.toLocaleString()}</div>
          </div>;
        })}
      </div>

      {/* Recent tasks */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
        <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:12}}>Active & Recent Tasks</div>
        {tasks.filter(t=>t.status!=="Pending").slice(0,5).map(t=><div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
          <div>
            <div style={{color:"#c8daf0",fontWeight:600,fontSize:12}}>{t.name}</div>
            <div style={{color:C.dim,fontSize:10}}>{t.assignee} · {PHASES.find(p=>p.id===t.phase)?.label}</div>
          </div>
          <Badge t={t.status}/>
        </div>)}
      </div>

      {/* Materials alert */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
        <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:12}}>Materials Status</div>
        {materials.map(m=><div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div>
            <div style={{color:"#c8daf0",fontWeight:600,fontSize:12}}>{m.name}</div>
            <div style={{color:C.dim,fontSize:10}}>{m.delivered}/{m.qty} {m.unit} delivered</div>
          </div>
          <Badge t={m.status}/>
        </div>)}
      </div>
    </div>
  </div>;
}

// ─── TASKS ────────────────────────────────────────────────────────────────────
function Tasks({tasks,setTasks,workers}){
  const [phase,setPhase]=useState("all");
  const [modal,setModal]=useState(false);
  const [f,setF]=useState({});
  const filtered=tasks.filter(t=>phase==="all"||t.phase===phase);
  const save=()=>{
    if(!f.name)return;
    if(!tasks.find(t=>t.id===f.id))setTasks(p=>[...p,f]);
    else setTasks(p=>p.map(t=>t.id===f.id?f:t));
    setModal(false);
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div><h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:0,fontSize:20}}>Tasks & Schedule</h2><p style={{color:C.dim,margin:"2px 0 0",fontSize:11}}>{tasks.filter(t=>t.status==="Done").length}/{tasks.length} complete</p></div>
      <button onClick={()=>{setF({id:uid("T"),status:"Pending",progress:0,priority:"Medium",phase:"foundation"});setModal(true);}} style={BP(C.amber)}><SVG d={IC.plus} s={14}/> Add Task</button>
    </div>

    {/* Phase filter */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      {[{id:"all",label:"All",icon:"📋"},...PHASES].map(p=><button key={p.id} onClick={()=>setPhase(p.id)} style={{background:phase===p.id?C.amber+"22":"none",color:phase===p.id?C.amber:C.muted,border:`1px solid ${phase===p.id?C.amber+"44":C.border}`,borderRadius:99,padding:"5px 12px",cursor:"pointer",fontSize:12,fontWeight:phase===p.id?700:500,fontFamily:"inherit"}}>{p.icon} {p.label}</button>)}
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map(t=>{
        const ph=PHASES.find(p=>p.id===t.phase);
        return <div key={t.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <span style={{fontSize:13,color:ph?.color}}>{ph?.icon}</span>
                <span style={{color:C.text,fontWeight:700,fontSize:13}}>{t.name}</span>
                <Badge t={t.priority} small/>
              </div>
              <div style={{color:C.dim,fontSize:11}}>{t.assignee} · {t.start} → {t.end} · KES {t.cost.toLocaleString()}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Badge t={t.status}/>
              <button onClick={()=>{setF({...t});setModal(true);}} style={{background:"none",border:"none",color:C.blue,cursor:"pointer"}}><SVG d={IC.edit} s={14}/></button>
              <button onClick={()=>{if(confirm("Delete task?"))setTasks(p=>p.filter(x=>x.id!==t.id));}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><SVG d={IC.trash} s={14}/></button>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1}}><ProgBar pct={t.progress} color={ph?.color||C.blue} h={6}/></div>
            <span style={{color:ph?.color||C.blue,fontSize:12,fontWeight:700,minWidth:35}}>{t.progress}%</span>
          </div>
        </div>;
      })}
    </div>

    {modal&&<Modal title="Task" onClose={()=>setModal(false)}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
        <div style={{gridColumn:"1/-1"}}><Field label="Task Name"><Inp value={f.name||""} onChange={e=>setF(x=>({...x,name:e.target.value}))}/></Field></div>
        <Field label="Phase"><Sel value={f.phase||"foundation"} onChange={e=>setF(x=>({...x,phase:e.target.value}))}>{PHASES.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</Sel></Field>
        <Field label="Assigned To"><Sel value={f.assignee||""} onChange={e=>setF(x=>({...x,assignee:e.target.value}))}><option value="">Select worker</option>{workers.map(w=><option key={w.id}>{w.name}</option>)}</Sel></Field>
        <Field label="Start Date"><Inp type="date" value={f.start||""} onChange={e=>setF(x=>({...x,start:e.target.value}))}/></Field>
        <Field label="End Date"><Inp type="date" value={f.end||""} onChange={e=>setF(x=>({...x,end:e.target.value}))}/></Field>
        <Field label="Cost (KES)"><Inp type="number" value={f.cost||""} onChange={e=>setF(x=>({...x,cost:+e.target.value}))}/></Field>
        <Field label="Progress (%)"><Inp type="number" min="0" max="100" value={f.progress||0} onChange={e=>setF(x=>({...x,progress:+e.target.value}))}/></Field>
        <Field label="Status"><Sel value={f.status||"Pending"} onChange={e=>setF(x=>({...x,status:e.target.value}))}>{["Pending","In Progress","Done","Blocked"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Priority"><Sel value={f.priority||"Medium"} onChange={e=>setF(x=>({...x,priority:e.target.value}))}>{["High","Medium","Low"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:14}}>
        <button onClick={()=>setModal(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>Cancel</button>
        <button onClick={save} style={BP(C.amber)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── BUDGET ───────────────────────────────────────────────────────────────────
function Budget({budget,setBudget,tasks}){
  const [modal,setModal]=useState(false);
  const [f,setF]=useState({});
  const total=budget.reduce((s,b)=>s+b.allocated,0);
  const spent=budget.reduce((s,b)=>s+b.spent,0);
  const taskCost=tasks.reduce((s,t)=>s+t.cost,0);
  const save=()=>{
    if(!f.category)return;
    if(!budget.find(b=>b.id===f.id))setBudget(p=>[...p,f]);
    else setBudget(p=>p.map(b=>b.id===f.id?f:b));
    setModal(false);
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div><h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:0,fontSize:20}}>Budget Tracker</h2><p style={{color:C.dim,margin:"2px 0 0",fontSize:11}}>KES {spent.toLocaleString()} spent of {total.toLocaleString()} allocated</p></div>
      <button onClick={()=>{setF({id:uid("B"),allocated:0,spent:0});setModal(true);}} style={BP(C.green)}><SVG d={IC.plus} s={14}/> Add Category</button>
    </div>

    {/* Summary cards */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
      {[
        {l:"Total Allocated",v:`KES ${(total/1000).toFixed(0)}K`,color:C.blue},
        {l:"Total Spent",v:`KES ${(spent/1000).toFixed(0)}K`,color:C.amber},
        {l:"Remaining",v:`KES ${((total-spent)/1000).toFixed(0)}K`,color:C.green},
      ].map(s=><div key={s.l} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px"}}>
        <div style={{color:C.dim,fontSize:10,fontWeight:700,textTransform:"uppercase",marginBottom:3}}>{s.l}</div>
        <div style={{color:s.color,fontSize:22,fontWeight:800,fontFamily:"'Fraunces',serif"}}>{s.v}</div>
      </div>)}
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {budget.map(b=>{
        const pct=Math.round((b.spent/b.allocated)*100);
        const rem=b.allocated-b.spent;
        return <div key={b.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div>
              <div style={{color:C.text,fontWeight:700,fontSize:14}}>{b.category}</div>
              <div style={{color:C.dim,fontSize:11,marginTop:2}}>KES {b.spent.toLocaleString()} spent · KES {rem.toLocaleString()} remaining</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:pct>90?C.red:pct>70?C.amber:C.green,fontWeight:800,fontSize:18,fontFamily:"'Fraunces',serif"}}>{pct}%</span>
              <button onClick={()=>{setF({...b});setModal(true);}} style={{background:"none",border:"none",color:C.blue,cursor:"pointer"}}><SVG d={IC.edit} s={14}/></button>
              <button onClick={()=>{if(confirm("Delete?"))setBudget(p=>p.filter(x=>x.id!==b.id));}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><SVG d={IC.trash} s={14}/></button>
            </div>
          </div>
          <ProgBar pct={pct} color={pct>90?C.red:pct>70?C.amber:C.green} h={8}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{color:C.dim,fontSize:10}}>Allocated: KES {b.allocated.toLocaleString()}</span>
            {pct>85&&<span style={{color:C.red,fontSize:10,fontWeight:700}}>⚠ Near limit</span>}
          </div>
        </div>;
      })}
    </div>

    <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginTop:14}}>
      <div style={{color:C.dim,fontSize:11,marginBottom:4}}>📋 Estimated total task cost from schedule</div>
      <div style={{color:C.text,fontWeight:700,fontSize:15}}>KES {taskCost.toLocaleString()}</div>
    </div>

    {modal&&<Modal title="Budget Category" onClose={()=>setModal(false)}>
      <Field label="Category Name"><Inp value={f.category||""} onChange={e=>setF(x=>({...x,category:e.target.value}))}/></Field>
      <Field label="Allocated (KES)"><Inp type="number" value={f.allocated||""} onChange={e=>setF(x=>({...x,allocated:+e.target.value}))}/></Field>
      <Field label="Spent (KES)"><Inp type="number" value={f.spent||""} onChange={e=>setF(x=>({...x,spent:+e.target.value}))}/></Field>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:14}}>
        <button onClick={()=>setModal(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>Cancel</button>
        <button onClick={save} style={BP(C.green)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── WORKERS ──────────────────────────────────────────────────────────────────
function Workers({workers,setWorkers}){
  const [modal,setModal]=useState(false);
  const [f,setF]=useState({});
  const save=()=>{
    if(!f.name)return;
    if(!workers.find(w=>w.id===f.id))setWorkers(p=>[...p,f]);
    else setWorkers(p=>p.map(w=>w.id===f.id?f:w));
    setModal(false);
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div><h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:0,fontSize:20}}>Workers & Crew</h2><p style={{color:C.dim,margin:"2px 0 0",fontSize:11}}>{workers.filter(w=>w.status==="On Site").length} on site · {workers.length} total</p></div>
      <button onClick={()=>{setF({id:uid("W"),status:"Off Site",rate:1500});setModal(true);}} style={BP(C.blue)}><SVG d={IC.plus} s={14}/> Add Worker</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
      {workers.map(w=><div key={w.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{width:38,height:38,background:`hsl(${w.name.charCodeAt(0)*7%360},50%,25%)`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:C.text,fontWeight:700,fontSize:15,marginBottom:8}}>{w.name.charAt(0)}</div>
            <div style={{color:C.text,fontWeight:700,fontSize:14}}>{w.name}</div>
            <div style={{color:C.muted,fontSize:12}}>{w.role}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <Badge t={w.status}/>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{setF({...w});setModal(true);}} style={{background:"none",border:"none",color:C.blue,cursor:"pointer"}}><SVG d={IC.edit} s={13}/></button>
              <button onClick={()=>{if(confirm(`Remove ${w.name}?`))setWorkers(p=>p.filter(x=>x.id!==w.id));}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><SVG d={IC.trash} s={13}/></button>
            </div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
          <div><div style={{color:C.dim,fontSize:10}}>Phone</div><div style={{color:"#c8daf0",fontSize:12}}>{w.phone}</div></div>
          <div style={{textAlign:"right"}}><div style={{color:C.dim,fontSize:10}}>Daily Rate</div><div style={{color:C.amber,fontSize:12,fontWeight:700}}>KES {w.rate.toLocaleString()}</div></div>
        </div>
      </div>)}
    </div>
    {modal&&<Modal title="Worker" onClose={()=>setModal(false)}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
        <div style={{gridColumn:"1/-1"}}><Field label="Full Name"><Inp value={f.name||""} onChange={e=>setF(x=>({...x,name:e.target.value}))}/></Field></div>
        <Field label="Role / Trade"><Inp value={f.role||""} onChange={e=>setF(x=>({...x,role:e.target.value}))}/></Field>
        <Field label="Phone"><Inp value={f.phone||""} onChange={e=>setF(x=>({...x,phone:e.target.value}))}/></Field>
        <Field label="Daily Rate (KES)"><Inp type="number" value={f.rate||""} onChange={e=>setF(x=>({...x,rate:+e.target.value}))}/></Field>
        <Field label="Status"><Sel value={f.status||"Off Site"} onChange={e=>setF(x=>({...x,status:e.target.value}))}><option>On Site</option><option>Off Site</option></Sel></Field>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:14}}>
        <button onClick={()=>setModal(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>Cancel</button>
        <button onClick={save} style={BP(C.blue)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
function Materials({materials,setMaterials}){
  const [modal,setModal]=useState(false);
  const [f,setF]=useState({});
  const save=()=>{
    if(!f.name)return;
    if(!materials.find(m=>m.id===f.id))setMaterials(p=>[...p,f]);
    else setMaterials(p=>p.map(m=>m.id===f.id?f:m));
    setModal(false);
  };
  const totalValue=materials.reduce((s,m)=>s+m.qty*m.unitCost,0);
  const deliveredValue=materials.reduce((s,m)=>s+m.delivered*m.unitCost,0);
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div><h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:0,fontSize:20}}>Materials & Supplies</h2><p style={{color:C.dim,margin:"2px 0 0",fontSize:11}}>KES {deliveredValue.toLocaleString()} of {totalValue.toLocaleString()} delivered</p></div>
      <button onClick={()=>{setF({id:uid("M"),delivered:0,status:"Pending"});setModal(true);}} style={BP(C.orange)}><SVG d={IC.plus} s={14}/> Add Material</button>
    </div>
    <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr>{["Material","Qty","Unit Cost","Total","Delivered","Status",""].map(h=><th key={h} style={{textAlign:"left",padding:"10px 14px",color:C.dim,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
        <tbody>
          {materials.map(m=>{
            const pct=Math.round((m.delivered/m.qty)*100);
            return <tr key={m.id} style={{borderBottom:"1px solid #0d1e30"}}>
              <td style={{padding:"11px 14px",color:C.text,fontWeight:600}}>{m.name}</td>
              <td style={{padding:"11px 14px",color:"#c8daf0"}}>{m.qty} {m.unit}</td>
              <td style={{padding:"11px 14px",color:"#c8daf0"}}>KES {m.unitCost.toLocaleString()}</td>
              <td style={{padding:"11px 14px",color:C.amber,fontWeight:700}}>KES {(m.qty*m.unitCost).toLocaleString()}</td>
              <td style={{padding:"11px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{flex:1,minWidth:60}}><ProgBar pct={pct} color={pct===100?C.green:C.blue} h={4}/></div>
                  <span style={{color:"#c8daf0",fontSize:11}}>{m.delivered}/{m.qty}</span>
                </div>
              </td>
              <td style={{padding:"11px 14px"}}><Badge t={m.status}/></td>
              <td style={{padding:"11px 14px",textAlign:"right",whiteSpace:"nowrap"}}>
                <button onClick={()=>{setF({...m});setModal(true);}} style={{background:"none",border:"none",color:C.blue,cursor:"pointer",marginRight:6}}><SVG d={IC.edit} s={13}/></button>
                <button onClick={()=>{if(confirm("Delete?"))setMaterials(p=>p.filter(x=>x.id!==m.id));}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><SVG d={IC.trash} s={13}/></button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
    {modal&&<Modal title="Material" onClose={()=>setModal(false)}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}>
        <div style={{gridColumn:"1/-1"}}><Field label="Material Name"><Inp value={f.name||""} onChange={e=>setF(x=>({...x,name:e.target.value}))}/></Field></div>
        <Field label="Quantity"><Inp type="number" value={f.qty||""} onChange={e=>setF(x=>({...x,qty:+e.target.value}))}/></Field>
        <Field label="Unit (bags/kg/m/pcs)"><Inp value={f.unit||""} onChange={e=>setF(x=>({...x,unit:e.target.value}))}/></Field>
        <Field label="Unit Cost (KES)"><Inp type="number" value={f.unitCost||""} onChange={e=>setF(x=>({...x,unitCost:+e.target.value}))}/></Field>
        <Field label="Delivered"><Inp type="number" value={f.delivered||0} onChange={e=>setF(x=>({...x,delivered:+e.target.value}))}/></Field>
        <div style={{gridColumn:"1/-1"}}><Field label="Status"><Sel value={f.status||"Pending"} onChange={e=>setF(x=>({...x,status:e.target.value}))}>{["Pending","Ordered","Partial","Delivered"].map(s=><option key={s}>{s}</option>)}</Sel></Field></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:14}}>
        <button onClick={()=>setModal(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>Cancel</button>
        <button onClick={save} style={BP(C.orange)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── GANTT ────────────────────────────────────────────────────────────────────
function Gantt({tasks}){
  const startDate=new Date("2026-03-01");
  const endDate=new Date("2026-06-30");
  const totalDays=Math.ceil((endDate-startDate)/(1000*60*60*24));
  const toPos=d=>Math.max(0,Math.ceil((new Date(d)-startDate)/(1000*60*60*24)));
  const months=["Mar","Apr","May","Jun"];

  return <div>
    <div style={{marginBottom:16}}>
      <h2 style={{fontFamily:"'Fraunces',serif",color:C.text,margin:0,fontSize:20}}>Gantt Chart</h2>
      <p style={{color:C.dim,margin:"2px 0 0",fontSize:11}}>Project timeline: March — June 2026</p>
    </div>
    <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
      {/* Month headers */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,background:C.surf2}}>
        <div style={{width:220,flexShrink:0,padding:"8px 14px",color:C.dim,fontSize:11,fontWeight:700,borderRight:`1px solid ${C.border}`}}>TASK</div>
        <div style={{flex:1,display:"flex"}}>
          {months.map((m,i)=><div key={m} style={{flex:1,padding:"8px",color:C.dim,fontSize:11,fontWeight:700,textAlign:"center",borderRight:i<3?`1px solid ${C.border}`:""}}>{m} 2026</div>)}
        </div>
      </div>

      {/* Phase groups */}
      {PHASES.map(ph=>{
        const pts=tasks.filter(t=>t.phase===ph.id);
        if(!pts.length)return null;
        return <div key={ph.id}>
          <div style={{display:"flex",background:ph.color+"11",borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:220,flexShrink:0,padding:"6px 14px",color:ph.color,fontSize:11,fontWeight:800,borderRight:`1px solid ${C.border}`}}>{ph.icon} {ph.label.toUpperCase()}</div>
            <div style={{flex:1}}/>
          </div>
          {pts.map(t=>{
            const start=toPos(t.start);
            const end=toPos(t.end);
            const width=Math.max(end-start,1);
            const leftPct=(start/totalDays)*100;
            const widthPct=(width/totalDays)*100;
            const ph2=PHASES.find(p=>p.id===t.phase);
            return <div key={t.id} style={{display:"flex",borderBottom:`1px solid #0d1e30`,minHeight:36,alignItems:"center"}}>
              <div style={{width:220,flexShrink:0,padding:"0 14px",color:"#c8daf0",fontSize:11,borderRight:`1px solid ${C.border}`,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={t.name}>{t.name}</div>
              <div style={{flex:1,position:"relative",height:36,display:"flex",alignItems:"center"}}>
                {/* Grid lines */}
                {[0,25,50,75].map(p=><div key={p} style={{position:"absolute",left:`${p}%`,top:0,bottom:0,width:1,background:C.border+"66"}}/>)}
                {/* Bar */}
                <div style={{position:"absolute",left:`${leftPct}%`,width:`${widthPct}%`,height:18,background:ph2?.color||C.blue,borderRadius:4,minWidth:4,opacity:0.85,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${t.progress}%`,background:"rgba(255,255,255,0.3)",borderRadius:4}}/>
                </div>
              </div>
            </div>;
          })}
        </div>;
      })}
    </div>
    <div style={{display:"flex",gap:14,marginTop:12,flexWrap:"wrap"}}>
      {PHASES.map(ph=><div key={ph.id} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:12,background:ph.color,borderRadius:2}}/><span style={{color:C.dim,fontSize:11}}>{ph.label}</span></div>)}
      <div style={{display:"flex",alignItems:"center",gap:5,marginLeft:"auto"}}><div style={{width:12,height:12,background:"rgba(255,255,255,0.3)",borderRadius:2,border:`1px solid ${C.border}`}}/><span style={{color:C.dim,fontSize:11}}>Progress fill</span></div>
    </div>
  </div>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [tasks,setTasks]=useState(initTasks);
  const [budget,setBudget]=useState(initBudget);
  const [workers,setWorkers]=useState(initWorkers);
  const [materials,setMaterials]=useState(initMaterials);

  const nav=[
    {k:"dashboard",l:"Dashboard",i:IC.dash,c:"#60a5fa"},
    {k:"tasks",l:"Tasks",i:IC.tasks,c:C.amber},
    {k:"budget",l:"Budget",i:IC.budget,c:C.green},
    {k:"workers",l:"Workers",i:IC.workers,c:C.blue},
    {k:"materials",l:"Materials",i:IC.materials,c:C.orange},
    {k:"gantt",l:"Gantt Chart",i:IC.gantt,c:"#a78bfa"},
  ];

  return <>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:"#c8daf0",overflow:"hidden"}}>
      {/* Sidebar */}
      <div style={{width:200,background:C.surf,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"18px 10px",flexShrink:0}}>
        <div style={{padding:"0 8px 18px",borderBottom:`1px solid ${C.border}`,marginBottom:14}}>
          <div style={{fontSize:22,marginBottom:4}}>🏗️</div>
          <div style={{color:C.text,fontWeight:800,fontSize:14,fontFamily:"'Fraunces',serif",lineHeight:1.2}}>BuildTrack</div>
          <div style={{color:C.dim,fontSize:10,marginTop:2}}>House Construction Manager</div>
        </div>
        {nav.map(n=><button key={n.k} onClick={()=>setPage(n.k)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"9px 10px",background:page===n.k?n.c+"18":"none",color:page===n.k?n.c:C.muted,border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:page===n.k?700:500,marginBottom:2,fontFamily:"'DM Sans',sans-serif",textAlign:"left",transition:"all .15s"}}>
          <SVG d={n.i} s={15}/>{n.l}
        </button>)}
        <div style={{marginTop:"auto",padding:"14px 8px 0",borderTop:`1px solid ${C.border}`}}>
          <div style={{color:C.dim,fontSize:10}}>Sigana Residence</div>
          <div style={{color:"#1e3048",fontSize:10}}>BuildTrack © 2026</div>
        </div>
      </div>
      {/* Main */}
      <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>
        {page==="dashboard"&&<Dashboard tasks={tasks} budget={budget} workers={workers} materials={materials}/>}
        {page==="tasks"&&<Tasks tasks={tasks} setTasks={setTasks} workers={workers}/>}
        {page==="budget"&&<Budget budget={budget} setBudget={setBudget} tasks={tasks}/>}
        {page==="workers"&&<Workers workers={workers} setWorkers={setWorkers}/>}
        {page==="materials"&&<Materials materials={materials} setMaterials={setMaterials}/>}
        {page==="gantt"&&<Gantt tasks={tasks}/>}
      </div>
    </div>
  </>;
}
