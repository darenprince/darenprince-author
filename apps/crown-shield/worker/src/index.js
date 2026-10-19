const ADULT_NAME = "Crown Shield — Adult Content Protection";
const THREAT_NAME = "Crown Shield — Malware & Phishing Protection";
const ADULT_TRAFFIC = "any(dns.content_category[*] in {2})";
const THREAT_TRAFFIC = "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})";
export default {
 async fetch(request, env) {
  const origin=request.headers.get("Origin")||"", allowed=env.ALLOWED_ORIGIN||"";
  const headers={"Access-Control-Allow-Origin":origin===allowed?origin:"null","Access-Control-Allow-Methods":"GET,POST,DELETE,OPTIONS","Access-Control-Allow-Headers":"Authorization,Content-Type","Vary":"Origin","Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
  const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers});
  if(!allowed||origin!==allowed)return json({error:"Origin not allowed."},403);
  for(const k of ["SUPABASE_URL","SUPABASE_ANON_KEY","CLOUDFLARE_ACCOUNT_ID","CLOUDFLARE_API_TOKEN","ADMIN_EMAILS"])if(!env[k])return json({error:"Secure backend configuration incomplete."},503);
  const auth=request.headers.get("Authorization")||"";if(!auth.startsWith("Bearer "))return json({error:"Sign-in required."},401);
  let u;try{const r=await fetch(env.SUPABASE_URL.replace(/\/$/,"")+"/auth/v1/user",{headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:auth}});if(!r.ok)return json({error:"Session invalid or expired."},401);u=await r.json();}catch{return json({error:"Session verification failed."},502);}
  const allowedEmails=env.ADMIN_EMAILS.split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);if(!u.email||!allowedEmails.includes(u.email.toLowerCase()))return json({error:"Account is not authorized for Crown Shield administration."},403);
  const gateway=async(path,method="GET",body)=>{const r=await fetch("https://api.cloudflare.com/client/v4/accounts/"+env.CLOUDFLARE_ACCOUNT_ID+path,{method,headers:{Authorization:"Bearer "+env.CLOUDFLARE_API_TOKEN,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined});const d=await r.json().catch(()=>({}));if(!r.ok||d.success===false)throw Error(d.errors?.map(x=>x.message).join("; ")||"Cloudflare Gateway request failed.");return d.result;};
  const policies=async()=>{const r=await gateway("/gateway/rules?per_page=100");return Array.isArray(r)?r:[];};
  const mk=(name,description,traffic,precedence,enabled=true,action="block")=>({name,description,precedence,enabled,action,filters:["dns"],traffic,identity:"",block_page_enabled:action==="block",block_reason:"Blocked by Crown Shield: content restriction or security threat."});
  try{
   const path=new URL(request.url).pathname;
   if(path==="/api/status"&&request.method==="GET"){const p=await policies();return json({gatewayReady:true,adultProtection:{enabled:!!p.find(x=>x.name===ADULT_NAME&&x.enabled),id:p.find(x=>x.name===ADULT_NAME)?.id||null},threatProtection:{enabled:!!p.find(x=>x.name===THREAT_NAME&&x.enabled),id:p.find(x=>x.name===THREAT_NAME)?.id||null},domainRules:p.filter(x=>x.name?.startsWith("Crown Shield Domain:")).map(x=>({id:x.id,domain:x.name.replace(/^Crown Shield Domain: (?:block|allow) /,""),mode:x.name.includes(": allow ")?"allow":"block"}))});}
   if(path==="/api/protection/adult"&&request.method==="POST"){const b=await request.json(),p=await policies(),old=p.find(x=>x.name===ADULT_NAME);let r;if(old)r=await gateway("/gateway/rules/"+old.id,"PATCH",{enabled:!!b.enabled});else if(b.enabled)r=await gateway("/gateway/rules","POST",mk(ADULT_NAME,"Block Cloudflare-classified Adult Themes for DNS traffic routed through Gateway.",ADULT_TRAFFIC,10));else return json({ok:true});return json({ok:true,enabled:!!(r?.enabled??b.enabled)});}
   if(path==="/api/domains"&&(request.method==="POST"||request.method==="DELETE")){const b=await request.json(),p=await policies();if(request.method==="DELETE"){const old=p.find(x=>x.id===b.id&&x.name?.startsWith("Crown Shield Domain:"));if(!old)return json({error:"Domain rule not found."},404);await gateway("/gateway/rules/"+old.id,"DELETE");return json({ok:true});}const domain=String(b.domain||"").trim().toLowerCase().replace(/^https?:\/\//,"").split("/")[0];const mode=b.mode==="allow"?"allow":"block";if(!/^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain))return json({error:"Enter a valid domain, such as example.com."},400);const name="Crown Shield Domain: "+mode+" "+domain;if(p.some(x=>x.name===name))return json({error:"That rule already exists."},409);const result=await gateway("/gateway/rules","POST",mk(name,"Crown Shield custom domain rule.",'dns.fqdn == "'+domain+'"',mode==="allow"?5:80,true,mode));return json({ok:true,id:result.id});}
   return json({error:"Not found."},404);
  }catch(e){return json({error:e.message||"Provider request failed."},502);}
 }
};