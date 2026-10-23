import {createHash} from "node:crypto";
import {mkdir,writeFile} from "node:fs/promises";

const releaseId=process.env.ASSURANCE_ESCROW_RELEASE_ID;
if(!/^[a-z0-9][a-z0-9-]{2,63}$/.test(releaseId||""))throw Error("ASSURANCE_ESCROW_RELEASE_ID must be a lowercase release identifier");
const publishers=[
  {domain:"source-1-inky.vercel.app",projectId:"prj_99LJXvhKyDeBlnoYmdBDSRAjAz1s",unavailable:0},
  {domain:"source-2-ten.vercel.app",projectId:"prj_kr41WonbTHfDIDLfpHAw9tBea3Mp",unavailable:0},
  {domain:"source-3-five.vercel.app",projectId:"prj_gbrHO5IVkxZc3onG9MZcAnMrBWnI",unavailable:120},
  {domain:"source-4-kappa.vercel.app",projectId:"prj_s40sr7YFfrktHL0XHYVtkqSSwbu6",unavailable:150},
  {domain:"source-5-three.vercel.app",projectId:"prj_0tNXzJDoR4f5EljgbquJTWUFk5UI",unavailable:180},
];
const orgId="team_bZujPcmSUrS3h2v7sYiDEZEU",now=Math.floor(Date.now()/1000),observedFrom=now-7200,observedUntil=now-3600,total=observedUntil-observedFrom;
const sha=value=>createHash("sha256").update(value).digest("hex"),stable=value=>JSON.stringify(value),root=new URL("../publisher-build/",import.meta.url),obligationId=`urn:assurance-escrow:obligation:${releaseId}:uptime:${observedFrom}-${observedUntil}`;
const sources=[];
for(const [index,publisher] of publishers.entries()){
  const number=index+1,sourceId=`publisher-${number}`,authorityId=`urn:assurance-escrow:authority:${number}`,contentVersion=`${releaseId}/uptime-${number<=2?"primary":"counter"}-${number}`,outcome=publisher.unavailable===0?"FULFILLED":"BREACHED";
  const artifact=stable({schema:"assurance-escrow.independent-attestation/v1",publisher_id:`did:web:${publisher.domain}`,authority_id:authorityId,source_id:sourceId,obligation_id:obligationId,subject:"API availability measurement",content_version:contentVersion,outcome,observed_from:observedFrom,observed_until:observedUntil,statement:`Recorded ${publisher.unavailable} unavailable seconds during a ${total}-second observation period.`,facts:{total_seconds:total,unavailable_seconds:publisher.unavailable,period_start:observedFrom,period_end:observedUntil}}),contentSha256=sha(artifact),did=stable({id:`did:web:${publisher.domain}`,service:[{id:`did:web:${publisher.domain}#evidence`,type:"LinkedDomains",serviceEndpoint:`https://${publisher.domain}/evidence/`}]}),didSha256=sha(did),publisherRoot=new URL(`source-${number}/`,root);
  await mkdir(new URL("evidence/",publisherRoot),{recursive:true});await mkdir(new URL(".well-known/",publisherRoot),{recursive:true});
  await writeFile(new URL(`evidence/${contentSha256}.json`,publisherRoot),artifact);await writeFile(new URL(".well-known/did.json",publisherRoot),did);await writeFile(new URL("vercel.json",publisherRoot),JSON.stringify({cleanUrls:false,buildCommand:"exit 0",installCommand:"exit 0",outputDirectory:"."}));await mkdir(new URL(".vercel/",publisherRoot),{recursive:true});await writeFile(new URL(".vercel/project.json",publisherRoot),JSON.stringify({projectId:publisher.projectId,orgId,projectName:`source-${number}`}));
  sources.push({source_id:sourceId,authority_id:authorityId,url:`https://${publisher.domain}/evidence/${contentSha256}.json`,publisher_id:`did:web:${publisher.domain}`,publisher_domain:publisher.domain,did_sha256:didSha256,did_http_status:200,service_path:"/evidence/",content_version:contentVersion,content_sha256:contentSha256,evidence_http_status:200,observed_from:observedFrom,observed_until:observedUntil});
}
const counter={schema:"assurance-escrow.counterevidence/v1",sources:sources.slice(2)},policy={schema:"assurance-escrow.evidence-policy/v1",obligation_id:obligationId,observed_from:observedFrom,observed_until:observedUntil,source_rule:{min_sources:2,min_verified:2,min_agreement:2},counter_rule:{min_sources:3,min_verified:3,min_agreement:2},semantic_rule:{kind:"uptime_bps",threshold_bps:9990,fulfilled_code:"FULFILLED",breached_code:"BREACHED"},sources:sources.slice(0,2),counterevidence:counter};
await mkdir(new URL("../artifacts/",import.meta.url),{recursive:true});await writeFile(new URL(`../artifacts/evidence-policy.${releaseId}.json`,import.meta.url),stable(policy));await writeFile(new URL(`../artifacts/counterevidence.${releaseId}.json`,import.meta.url),stable(counter));console.log(JSON.stringify({releaseId,obligationId,policy,counter},null,2));
