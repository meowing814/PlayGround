import * as THREE from 'three';

const mat=(color,roughness=1)=>new THREE.MeshStandardMaterial({color,roughness});
const palette={wood:'#79513b',wood2:'#966344',dark:'#392a25',cream:'#ead8b9',roof:'#49312b',sand:'#b8875b',rust:'#b96248',sage:'#65715a',gold:'#dda96a'};
function box(parent,x,y,z,w,h,d,color,opts={}){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function sphere(parent,x,y,z,r,color,sx=1,sy=1,sz=1){const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),mat(color));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;parent.add(m);return m}
function cylinder(parent,x,y,z,r1,r2,h,color,segments=12){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),mat(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m}
function makeBuilding(parent,x,z,w,h,d,color,front=true){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);box(g,0,h/2,0,w,h,d,color);box(g,0,h+.25,0,w+.28,.5,d+.28,palette.roof);for(let i=-1;i<=1;i++){box(g,i*w*.27,h*.56,d/2+.012,.42,.67,.06,'#34251f');box(g,i*w*.27,h*.56,d/2+.05,.05,.73,.05,'#b18a60')}box(g,0,h+.12,d/2+.04,w+.18,.16,.14,'#c7a576');box(g,0,h*.23,d/2+.05,.9,h*.46,.12,'#473128');if(front){box(g,0,h+.62,d/2+.16,2.1,.55,.13,'#392820');box(g,0,h+.62,d/2+.24,1.96,.06,.02,'#dfba83')}return g}
function makePerson(parent, cfg){const g=new THREE.Group();g.position.set(cfg.x,0,cfg.z);parent.add(g);const skin=cfg.skin||'#d79a77', outfit=cfg.outfit, hair=cfg.hair;
 sphere(g,0,1.54,0,.32,skin,.82,1.05,.8);sphere(g,0,1.68,-.08,.34,hair,.94,.87,.92);sphere(g,-.31,1.48,0,.1,skin,.6,1,.65);sphere(g,.31,1.48,0,.1,skin,.6,1,.65);
 // torso, skirt, sleeves and boots
 const torso=cylinder(g,0,.94,0,.38,.28,.8,outfit,10);torso.scale.x=.9;const skirt=cylinder(g,0,.48,0,.55,.3,.62,cfg.skirt||outfit,12);skirt.position.y=.48;
 cylinder(g,-.39,.95,0,.13,.14,.67,outfit,10).rotation.z=.22;cylinder(g,.39,.95,0,.14,.13,.67,outfit,10).rotation.z=-.22;
 box(g,-.16,.13,.04,.22,.28,.34,'#35251f');box(g,.16,.13,.04,.22,.28,.34,'#35251f');
 // eyes and smile
 sphere(g,-.105,1.56,.277,.035,'#2b211e',1,.65,.45);sphere(g,.105,1.56,.277,.035,'#2b211e',1,.65,.45);box(g,0,1.39,.286,.11,.025,.02,'#a85e58');
 if(cfg.hat){cylinder(g,0,1.92,0,.42,.42,.07,cfg.hat,16);cylinder(g,0,2.07,0,.25,.27,.25,cfg.hat,12);box(g,0,1.96,.03,.35,.045,.36,cfg.band||palette.gold)}
 if(cfg.accent){box(g,.12,1.03,.28,.07,.07,.025,cfg.accent)}
 g.userData.baseY=0;return g}

export class WesternScene{
 constructor(el){this.el=el;this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#c9836f');this.scene.fog=new THREE.Fog('#c9836f',24,73);this.camera=new THREE.PerspectiveCamera(42,1,.1,120);this.camera.position.set(0,7.3,18);this.camera.lookAt(0,1.8,0);this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.28;el.appendChild(this.renderer.domElement);this.clock=new THREE.Clock();this.characters={};this.location='town';this.makeWorld();this.resize();window.addEventListener('resize',()=>this.resize());this.animate()}
 makeWorld(){const s=this.scene;const hemi=new THREE.HemisphereLight('#ffe3c4','#604333',2.1);s.add(hemi);const sun=new THREE.DirectionalLight('#ffd29a',3);sun.position.set(-8,14,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);s.add(sun);const fill=new THREE.DirectionalLight('#da9da4',.8);fill.position.set(9,8,-8);s.add(fill);
 const ground= new THREE.Mesh(new THREE.PlaneGeometry(120,100),mat('#aa7954'));ground.rotation.x=-Math.PI/2;ground.position.y=-.06;ground.receiveShadow=true;s.add(ground);
 // mesa silhouettes and distant buttes
 for(let i=0;i<9;i++){const x=(i-4)*9;const h=2.2+(i*7%5)*.62;const m=new THREE.Mesh(new THREE.ConeGeometry(4.5+(i%3)*1.5,h,5),mat(i%2?'#9b6155':'#a96758'));m.position.set(x,h/2-1,-31-(i%3)*4);m.rotation.y=.35;s.add(m)}
 // dirt road across the town
 const road=new THREE.Mesh(new THREE.PlaneGeometry(14,100),mat('#c49365'));road.rotation.x=-Math.PI/2;road.rotation.z=Math.PI/2;road.position.set(0,.01,-10);road.receiveShadow=true;s.add(road);
 // boardwalks and buildings
 for(const side of [-1,1]){box(s,side*7.2,.19,-3.3,3.8,.35,22,'#674532');for(let i=0;i<5;i++){const z=-10+i*4.9;makeBuilding(s,side*(9.4+(i%2)*1.2),z,4.2,3.3+(i%3)*.35,3.2,i%2?'#a16a49':'#7d5540');}}
 // recognizable saloon with porch and swinging sign
 const saloon=makeBuilding(s,-4.8,-1,5.1,4,4.3,'#9b6447');box(s,-4.8,2.5,1.3,5.8,.16,.4,'#c89e6c');for(let x of [-7,-2.6])cylinder(s,x,1.1,1.38,.075,.075,2.2,'#67422f');box(s,-4.8,3.5,1.51,2.1,.53,.17,'#372720');box(s,-4.8,3.52,1.61,1.92,.055,.02,'#efca8e');
 // water tower and windmill
 cylinder(s,7,3.1,-13,1.35,1.15,2.2,'#704e3a',16);cylinder(s,7,4.25,-13,1.55,1.55,.18,'#c09162',16);for(let i=0;i<4;i++){const blade=box(s,7,5.2,-13, .11,1.7,.1,'#d7c09a');blade.rotation.z=i*Math.PI/2}
 // cacti and scrub along the outskirts
 for(const [x,z] of [[-12,-12],[-14,-4],[13,-7],[12,2],[-13,3],[15,-18]]){cylinder(s,x,.8,z,.2,.24,1.6,'#526347',8);cylinder(s,x-.28,.65,z,.11,.13,.6,'#526347',8).rotation.z=1.2;cylinder(s,x-.5,.8,z,.1,.11,.45,'#526347',8);cylinder(s,x+.29,1.05,z,.11,.13,.6,'#526347',8).rotation.z=-1.2;cylinder(s,x+.49,1.19,z,.1,.11,.38,'#526347',8)}
 // foreground hitching rail, barrels, hay
 for(let i=0;i<3;i++){cylinder(s,-8+i*1.1,.45,4,.34,.34,.9,i===1?'#9a6543':'#85563d',12);cylinder(s,-8+i*1.1,.93,4,.35,.35,.08,'#b48a5f',12)}box(s,5,.85,3,3,.12,.12,'#674b36');for(let x of [3.7,6.3])box(s,x,.42,3,.12,.85,.12,'#674b36');
 // suspended dust sparkles
 this.dust=[];for(let i=0;i<42;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.025+(i%3)*.012,6,6),new THREE.MeshBasicMaterial({color:i%4?'#ffe0a6':'#fff0c8',transparent:true,opacity:.35+Math.random()*.4}));m.position.set((Math.random()-.5)*24,Math.random()*5+.2,(Math.random()-.5)*20-2);m.userData.phase=Math.random()*6;s.add(m);this.dust.push(m)}
 this.characters.ada=makePerson(s,{x:-3.3,z:2.2,skin:'#cf9778',outfit:'#47383a',skirt:'#332b31',hair:'#251d20',hat:'#392d2b',band:'#bf744e',accent:'#deb375'});
 this.characters.cleo=makePerson(s,{x:0,z:1.9,skin:'#e0b08e',outfit:'#48625b',skirt:'#3f5149',hair:'#a5734e',hat:'#766144',band:'#dfb56e',accent:'#b5c29a'});
 this.characters.ruby=makePerson(s,{x:3.4,z:2.2,skin:'#dca07c',outfit:'#8b4e56',skirt:'#683d4b',hair:'#39232a',hat:'#6b3735',band:'#e5b176',accent:'#e5bd79'});
 // scale and individually pose the three women as a welcoming cast
 for(const [key,g] of Object.entries(this.characters)){g.scale.setScalar(.9);g.userData.phase=Object.keys(this.characters).indexOf(key)*1.9;}
 this.showCharacter(null);
 // sunset disc
 const sunDisc=new THREE.Mesh(new THREE.CircleGeometry(2.1,40),new THREE.MeshBasicMaterial({color:'#f8c17f'}));sunDisc.position.set(-12,10,-34);sunDisc.lookAt(this.camera.position);s.add(sunDisc);
 }
 showCharacter(key){for(const [id,g] of Object.entries(this.characters)){g.visible=!key||key===id;g.scale.setScalar(key===id?1.12:.9)}}
 setLocation(location){this.location=location;const goals={town:{x:0,y:7.3,z:18,lookX:0,lookY:1.8,lookZ:0},saloon:{x:-2.1,y:5.7,z:11,lookX:-4,lookY:1.4,lookZ:0},canyon:{x:0,y:8.5,z:20,lookX:0,lookY:1.6,lookZ:-7}};this.goal=goals[location]}
 resize(){const w=this.el.clientWidth||innerWidth,h=this.el.clientHeight||innerHeight;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h)}
 animate(){requestAnimationFrame(()=>this.animate());const t=this.clock.getElapsedTime();this.dust.forEach((m,i)=>{m.position.y+=Math.sin(t*.5+m.userData.phase)*.0015;m.position.x+=Math.sin(t*.28+i)*.001});for(const g of Object.values(this.characters)){g.position.y=Math.sin(t*1.3+g.userData.phase)*.025;g.rotation.y=Math.sin(t*.42+g.userData.phase)*.035}if(this.goal){this.camera.position.lerp(new THREE.Vector3(this.goal.x,this.goal.y,this.goal.z),.025);this.camera.lookAt(new THREE.Vector3(this.goal.lookX,this.goal.lookY,this.goal.lookZ));if(this.camera.position.distanceTo(new THREE.Vector3(this.goal.x,this.goal.y,this.goal.z))<.04)this.goal=null}this.renderer.render(this.scene,this.camera)}
}
