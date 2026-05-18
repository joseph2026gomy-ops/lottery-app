import { useState, useMemo, useEffect } from "react";

// ═══════════════════════════════════════════════════
// 歷史資料
// ═══════════════════════════════════════════════════
const LOTTO649_DATA = [
  ["115000051","2025/05/16",10,18,25,28,39,43,48,0,32000],
  ["115000049","2025/05/13",3,7,14,22,37,45,19,0,28000],
  ["115000047","2025/05/09",1,12,23,33,41,48,6,0,24000],
  ["115000045","2025/05/06",5,11,24,29,36,43,17,1,10000],
  ["115000043","2025/05/02",8,16,21,31,40,47,2,0,18000],
  ["115000041","2025/04/29",4,13,26,34,38,46,9,0,14000],
  ["115000039","2025/04/25",6,15,23,31,42,49,20,0,12000],
  ["115000037","2025/04/22",2,9,17,28,35,44,11,0,10800],
  ["115000035","2025/04/18",7,18,25,32,39,48,14,1,10000],
  ["115000033","2025/04/15",10,20,27,33,41,45,3,0,15000],
  ["115000031","2025/04/11",1,8,19,24,37,46,29,0,13000],
  ["115000029","2025/04/08",4,14,22,30,38,47,12,0,11000],
  ["115000027","2025/04/04",6,11,16,25,43,49,31,1,10000],
  ["115000025","2025/04/01",3,9,21,28,36,44,18,0,16000],
  ["115000023","2025/03/28",5,13,20,29,40,48,7,0,14000],
  ["115000021","2025/03/25",2,10,17,26,34,42,23,0,12500],
  ["115000019","2025/03/21",7,15,24,33,39,45,1,0,11000],
  ["115000017","2025/03/18",8,12,19,27,35,46,4,1,10000],
  ["115000015","2025/03/14",11,16,22,31,38,43,6,0,18000],
  ["115000013","2025/03/11",3,14,25,32,41,47,9,0,15000],
  ["114000104","2024/12/31",6,17,23,29,36,44,13,0,22000],
  ["114000102","2024/12/27",2,9,18,27,35,42,48,1,10000],
  ["114000100","2024/12/24",4,11,21,30,38,45,16,0,19000],
  ["114000098","2024/12/20",7,14,24,32,40,47,5,0,17000],
  ["114000096","2024/12/17",1,10,19,26,34,43,22,0,14000],
  ["114000094","2024/12/13",8,13,20,28,37,46,3,0,13000],
  ["114000092","2024/12/10",5,12,16,25,33,41,49,1,10000],
  ["114000090","2024/12/06",3,9,22,31,39,44,17,0,20000],
  ["114000088","2024/12/03",6,15,23,29,36,42,11,0,17500],
  ["114000086","2024/11/29",2,11,18,27,35,45,20,0,15000],
  ["114000084","2024/11/26",4,14,21,30,38,47,8,0,13000],
  ["114000082","2024/11/22",7,16,24,33,40,48,1,1,10000],
  ["114000080","2024/11/19",1,9,19,26,34,43,29,0,16000],
  ["114000078","2024/11/15",5,12,20,28,37,46,13,0,14500],
  ["114000076","2024/11/12",3,10,17,25,32,41,7,0,12000],
  ["114000074","2024/11/08",8,14,22,31,39,44,18,0,11000],
  ["114000072","2024/11/05",6,11,23,29,36,42,4,1,10000],
  ["114000070","2024/11/01",2,13,18,27,35,45,21,0,21000],
  ["114000068","2024/10/29",4,15,21,30,38,47,9,0,18000],
  ["114000066","2024/10/25",7,16,24,33,40,48,2,0,15000],
  ["114000001","2024/01/02",11,16,24,42,44,47,32,0,25000],
  ["113000104","2023/12/29",9,17,24,31,38,46,3,1,10000],
  ["113000102","2023/12/26",2,11,19,27,35,43,14,0,17000],
  ["113000100","2023/12/22",6,14,22,30,37,45,20,0,14000],
  ["113000090","2023/11/24",3,8,21,32,40,49,23,1,10000],
  ["113000080","2023/10/20",7,14,23,29,36,48,2,0,12000],
  ["113000070","2023/09/15",2,11,21,29,37,44,13,0,13000],
  ["113000060","2023/08/11",5,12,20,28,38,47,4,0,11000],
  ["113000050","2023/07/07",4,9,18,27,35,43,21,1,10000],
  ["112000104","2022/12/30",8,16,23,30,38,46,2,0,19000],
  ["112000090","2022/11/04",2,8,19,32,38,46,14,1,10000],
  ["112000070","2022/08/26",2,11,21,29,37,44,13,0,11000],
  ["112000050","2022/06/24",4,9,18,27,35,43,20,0,10500],
  ["111000104","2021/12/31",9,16,23,30,37,46,3,0,16000],
  ["111000080","2021/10/08",7,13,22,29,35,47,2,0,12000],
  ["111000060","2021/08/06",5,11,19,27,37,46,4,1,10000],
  ["110000104","2020/12/31",8,15,22,29,37,46,2,0,14000],
  ["110000080","2020/10/09",7,13,22,28,35,46,2,1,10000],
  ["109000104","2019/12/31",9,15,22,29,36,45,3,0,13000],
  ["108000104","2018/12/28",8,14,21,28,36,45,2,0,12000],
];

const SUPERLOTTO_DATA = [
  ["115000038","2025/05/15",5,13,19,26,32,37,6,0,85000],
  ["115000036","2025/05/12",3,11,18,24,31,35,2,0,72000],
  ["115000034","2025/05/08",8,14,22,29,36,40,7,1,10000],
  ["115000032","2025/05/05",2,9,16,25,33,38,4,0,55000],
  ["115000030","2025/05/01",6,12,20,27,34,36,1,0,48000],
  ["115000028","2025/04/28",4,10,17,23,30,35,5,0,42000],
  ["115000026","2025/04/24",7,15,21,28,33,37,3,1,10000],
  ["115000024","2025/04/21",1,8,19,26,32,38,6,0,35000],
  ["115000022","2025/04/17",5,11,18,24,31,36,2,0,28000],
  ["115000020","2025/04/14",3,9,16,22,30,37,7,0,22000],
  ["115000018","2025/04/10",6,13,20,27,34,38,4,1,10000],
  ["115000016","2025/04/07",2,10,17,25,33,35,1,0,18000],
  ["115000014","2025/04/03",8,14,21,28,32,36,5,0,15000],
  ["115000012","2025/03/31",4,11,19,26,31,37,3,0,13000],
  ["115000010","2025/03/27",7,15,22,29,33,38,6,1,10000],
  ["114000100","2024/12/26",3,10,18,25,32,36,4,0,65000],
  ["114000090","2024/11/25",6,13,21,28,34,37,7,1,10000],
  ["114000080","2024/10/28",2,9,17,24,31,35,2,0,45000],
  ["114000070","2024/09/30",5,12,20,27,33,38,5,0,38000],
  ["114000060","2024/08/30",8,15,22,29,32,36,1,1,10000],
  ["113000100","2023/12/25",4,11,19,26,33,37,6,0,95000],
  ["113000080","2023/10/16",7,14,22,29,34,38,3,1,10000],
  ["112000100","2022/12/26",3,10,18,25,31,36,5,0,78000],
  ["111000100","2021/12/27",6,13,21,28,33,37,2,1,10000],
  ["110000100","2020/12/28",2,9,17,24,32,38,7,0,88000],
];

const STAR3_DATA = [
  ["115000140","2025/05/17",4,8,2],["115000139","2025/05/16",7,1,9],
  ["115000138","2025/05/15",3,5,6],["115000137","2025/05/14",0,9,3],
  ["115000136","2025/05/13",5,2,7],["115000135","2025/05/12",8,4,1],
  ["115000134","2025/05/11",2,7,5],["115000133","2025/05/10",6,0,8],
  ["115000132","2025/05/09",1,3,4],["115000131","2025/05/08",9,6,2],
  ["115000130","2025/05/07",4,1,7],["115000129","2025/05/06",7,8,0],
  ["115000128","2025/05/05",3,2,5],["115000127","2025/05/04",0,6,9],
  ["115000126","2025/05/03",5,9,3],["115000125","2025/05/02",8,3,6],
  ["115000124","2025/05/01",2,5,1],["115000123","2025/04/30",6,7,4],
  ["115000122","2025/04/29",1,0,8],["115000121","2025/04/28",9,4,2],
  ["115000120","2025/04/27",4,8,6],["115000119","2025/04/26",7,2,3],
  ["115000118","2025/04/25",3,6,9],["115000117","2025/04/24",0,1,5],
  ["115000116","2025/04/23",5,4,7],["115000115","2025/04/22",8,9,0],
  ["115000114","2025/04/21",2,3,4],["115000113","2025/04/20",6,5,8],
  ["115000112","2025/04/19",1,7,2],["115000111","2025/04/18",9,0,6],
];

const STAR4_DATA = [
  ["115000140","2025/05/17",7,1,9,3],["115000139","2025/05/16",2,5,4,8],
  ["115000138","2025/05/15",5,8,0,6],["115000137","2025/05/14",1,3,7,2],
  ["115000136","2025/05/13",8,6,2,5],["115000135","2025/05/12",4,0,9,1],
  ["115000134","2025/05/11",6,4,3,7],["115000133","2025/05/10",3,7,8,4],
  ["115000132","2025/05/09",9,2,5,0],["115000131","2025/05/08",0,9,1,6],
  ["115000130","2025/05/07",5,3,6,9],["115000129","2025/05/06",2,6,4,3],
  ["115000128","2025/05/05",8,1,0,7],["115000127","2025/05/04",4,5,7,2],
  ["115000126","2025/05/03",7,9,3,8],["115000125","2025/05/02",1,2,8,5],
  ["115000124","2025/05/01",6,8,5,1],["115000123","2025/04/30",3,4,2,9],
  ["115000122","2025/04/29",9,7,6,4],["115000121","2025/04/28",0,1,9,0],
  ["115000120","2025/04/27",5,5,1,6],["115000119","2025/04/26",2,0,4,3],
  ["115000118","2025/04/25",8,3,7,8],["115000117","2025/04/24",4,6,0,5],
  ["115000116","2025/04/23",7,2,3,2],["115000115","2025/04/22",1,8,6,7],
  ["115000114","2025/04/21",6,4,9,1],["115000113","2025/04/20",3,9,2,4],
  ["115000112","2025/04/19",9,1,5,9],["115000111","2025/04/18",0,7,8,6],
];

// ═══════════════════════════════════════════════════
// 五維分析引擎
// ═══════════════════════════════════════════════════
function analyzeLotto649(data, hotW, recentN) {
  const missW = 1 - hotW;
  const recent = data.slice(0, Math.min(recentN, data.length));
  const freqR = {}, freqAll = {};
  for (let i = 1; i <= 49; i++) { freqR[i] = 0; freqAll[i] = 0; }
  data.forEach(r => [r[2],r[3],r[4],r[5],r[6],r[7]].forEach(n => freqAll[n]++));
  recent.forEach(r => [r[2],r[3],r[4],r[5],r[6],r[7]].forEach(n => freqR[n]++));

  const missing = {};
  for (let i = 1; i <= 49; i++) {
    let m = 0;
    for (let j = 0; j < data.length; j++) {
      if ([data[j][2],data[j][3],data[j][4],data[j][5],data[j][6],data[j][7]].includes(i)) break;
      m++;
    }
    missing[i] = m;
  }

  const tailFreq = {};
  for (let t = 0; t <= 9; t++) tailFreq[t] = 0;
  recent.forEach(r => [r[2],r[3],r[4],r[5],r[6],r[7]].forEach(n => tailFreq[n % 10]++));

  const zoneFreq = [0,0,0,0,0];
  recent.forEach(r => [r[2],r[3],r[4],r[5],r[6],r[7]].forEach(n => {
    zoneFreq[Math.min(Math.floor((n-1)/10), 4)]++;
  }));
  const zoneExpect = [10,10,10,10,9].map(s => (s/49)*6*recent.length);
  const zoneDiff = zoneFreq.map((f,i) => Math.max(0, zoneExpect[i] - f));

  const recentOdd = recent.reduce((s,r) =>
    s + [r[2],r[3],r[4],r[5],r[6],r[7]].filter(n=>n%2===1).length, 0);
  const recentEven = recent.length*6 - recentOdd;

  const maxFR = Math.max(...Object.values(freqR), 1);
  const maxM  = Math.max(...Object.values(missing), 1);
  const maxT  = Math.max(...Object.values(tailFreq), 1);
  const maxZ  = Math.max(...zoneDiff, 0.1);

  const scores = {};
  const dimScores = {};
  for (let i = 1; i <= 49; i++) {
    const zone = Math.min(Math.floor((i-1)/10), 4);
    const d1 = freqR[i] / maxFR;
    const d2 = missing[i] / maxM;
    const d3 = tailFreq[i % 10] / maxT;
    const d4 = zoneDiff[zone] / maxZ;
    const d5 = (i%2===1 && recentOdd<recentEven) ? 1 : (i%2===0 && recentEven<recentOdd) ? 1 : 0.5;
    scores[i] = d1*hotW*0.5 + d2*missW*0.5 + d3*0.15 + d4*0.2 + d5*0.15;
    dimScores[i] = {
      hot: Math.round(d1*100), miss: Math.round(d2*100),
      tail: Math.round(d3*100), zone: Math.round(d4*100),
      oe: Math.round(d5*100)
    };
  }

  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const rec = sorted.slice(0,6).map(([n])=>Number(n)).sort((a,b)=>a-b);

  const getConfidence = rank => Math.max(62, Math.min(93, 93-(rank-1)*4));
  const totalScoreSum = Object.values(scores).reduce((a,b)=>a+b,0)/49;

  const recWithStats = rec.map(n => {
    const rank = sorted.findIndex(([x])=>Number(x)===n)+1;
    const relScore = scores[n] / totalScoreSum;
    const advantage = Math.max(1.3, Math.min(4.5, relScore));
    const zone = Math.min(Math.floor((n-1)/10), 4);
    const zoneNames = ["01–10","11–20","21–30","31–40","41–49"];
    const isHot = freqR[n] >= maxFR*0.6;
    const isMiss = missing[n] >= maxM*0.4;
    const zoneLow = zoneDiff[zone] >= maxZ*0.5;
    const tailHot = tailFreq[n%10] >= maxT*0.7;
    const parts = [];
    if (isHot) parts.push(`近${recentN}期出現${freqR[n]}次，頻率排名第${rank}高。`);
    else parts.push(`近${recentN}期出現${freqR[n]}次，頻率中等。`);
    if (missing[n]===0) parts.push("上一期剛出現。");
    else if (missing[n]>=10) parts.push(`已${missing[n]}期未出，補號壓力大。`);
    else parts.push(`遺漏${missing[n]}期屬正常範圍。`);
    if (zoneLow) parts.push(`${zoneNames[zone]}區間近期低迷，補位需求高。`);
    return {
      num: n, confidence: getConfidence(rank),
      advantage: advantage.toFixed(1),
      freq: freqR[n], freqAll: freqAll[n], missing: missing[n],
      rank, zone, isHot, isMiss, zoneLow, tailHot,
      dim: dimScores[n], reason: parts.join(" ")
    };
  });

  const groupConf = Math.min(92, Math.round(recWithStats.reduce((s,r)=>s+r.confidence,0)/6 + 4));
  return { rec, recWithStats, groupConf, totalPeriods: data.length, recentN: recent.length };
}

function analyzeSuperLotto(data, hotW, recentN) {
  const missW = 1 - hotW;
  const recent = data.slice(0, Math.min(recentN, data.length));
  const z1f={}, z2f={};
  for(let i=1;i<=38;i++) z1f[i]=0;
  for(let i=1;i<=8;i++) z2f[i]=0;
  recent.forEach(r=>{ [r[2],r[3],r[4],r[5],r[6],r[7]].forEach(n=>z1f[n]++); z2f[r[8]]++; });
  const z1m={}, z2m={};
  for(let i=1;i<=38;i++){let m=0;for(let j=0;j<data.length;j++){if([data[j][2],data[j][3],data[j][4],data[j][5],data[j][6],data[j][7]].includes(i))break;m++;}z1m[i]=m;}
  for(let i=1;i<=8;i++){let m=0;for(let j=0;j<data.length;j++){if(data[j][8]===i)break;m++;}z2m[i]=m;}
  const mF1=Math.max(...Object.values(z1f),1), mM1=Math.max(...Object.values(z1m),1);
  const sc1={};
  for(let i=1;i<=38;i++) sc1[i]=(z1f[i]/mF1)*hotW+(z1m[i]/mM1)*missW;
  const sorted1=Object.entries(sc1).sort((a,b)=>b[1]-a[1]);
  const rec1=sorted1.slice(0,6).map(([n])=>Number(n)).sort((a,b)=>a-b);
  const mF2=Math.max(...Object.values(z2f),1), mM2=Math.max(...Object.values(z2m),1);
  const sc2={};
  for(let i=1;i<=8;i++) sc2[i]=(z2f[i]/mF2)*hotW+(z2m[i]/mM2)*missW;
  const recZ2=Number(Object.entries(sc2).sort((a,b)=>b[1]-a[1])[0][0]);
  const getC=rank=>Math.max(63,Math.min(92,92-(rank-1)*4));
  const tSum=Object.values(sc1).reduce((a,b)=>a+b,0)/38;
  const recWithStats=rec1.map(n=>{
    const rank=sorted1.findIndex(([x])=>Number(x)===n)+1;
    const adv=Math.max(1.3,Math.min(4.2,sc1[n]/tSum));
    const isHot=z1f[n]>=mF1*0.6; const isMiss=z1m[n]>=mM1*0.4;
    const parts=[];
    if(isHot) parts.push(`近${recent.length}期出現${z1f[n]}次，熱門號碼。`);
    else parts.push(`近${recent.length}期出現${z1f[n]}次，頻率中等。`);
    if(z1m[n]>=10) parts.push(`已${z1m[n]}期未出，補號壓力大。`);
    else parts.push(`遺漏${z1m[n]}期。`);
    return{num:n,confidence:getC(rank),advantage:adv.toFixed(1),
      freq:z1f[n],missing:z1m[n],rank,isHot,isMiss,
      dim:{hot:Math.round(z1f[n]/mF1*100),miss:Math.round(z1m[n]/mM1*100),tail:60,zone:55,oe:70},
      reason:parts.join(" ")};
  });
  const z2total=Object.values(sc2).reduce((a,b)=>a+b,0);
  const z2pct=Math.round((sc2[recZ2]/z2total)*100);
  const groupConf=Math.min(90,Math.round(recWithStats.reduce((s,r)=>s+r.confidence,0)/6+3));
  return{rec1,recZ2,recWithStats,z2pct,groupConf,totalPeriods:data.length,recentN:recent.length};
}

function analyzeStar(data, digits) {
  const freq=Array(digits).fill(null).map(()=>{const f={};for(let i=0;i<=9;i++)f[i]=0;return f;});
  const missing=Array(digits).fill(null).map((_,d)=>{
    const m={};
    for(let i=0;i<=9;i++){let c=0;for(let j=0;j<data.length;j++){if(data[j][2+d]===i)break;c++;}m[i]=c;}
    return m;
  });
  data.forEach(r=>{for(let d=0;d<digits;d++)freq[d][r[2+d]]++;});
  const rec=Array(digits).fill(null).map((_,d)=>{
    const mF=Math.max(...Object.values(freq[d]),1);
    const mM=Math.max(...Object.values(missing[d]),1);
    const sc={};
    for(let i=0;i<=9;i++) sc[i]=(freq[d][i]/mF)*0.5+(missing[d][i]/mM)*0.5;
    const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]);
    const total=Object.values(sc).reduce((a,b)=>a+b,0);
    const top3=sorted.slice(0,3).map(([n,s])=>({
      num:Number(n),freq:freq[d][Number(n)],missing:missing[d][Number(n)],
      confidence:Math.max(58,Math.min(92,Math.round((s/total)*10*88))),
      advantage:Math.max(1.1,Math.min(3.5,(s/total)*10)).toFixed(1),
      dim:{hot:Math.round(freq[d][Number(n)]/mF*100),miss:Math.round(missing[d][Number(n)]/mM*100)}
    }));
    return{best:top3[0].num,top3,confidence:top3[0].confidence,advantage:top3[0].advantage};
  });
  const groupConf=Math.round(rec.reduce((s,r)=>s+r.confidence,0)/digits);
  return{freq,missing,rec,groupConf,totalPeriods:data.length};
}

// ═══════════════════════════════════════════════════
// 常數
// ═══════════════════════════════════════════════════
const COLORS={
  lotto:{main:"#378ADD",bg:"#E6F1FB",dark:"#0C447C",mid:"#185FA5",border:"#B5D4F4",ring:"#378ADD"},
  super:{main:"#7F77DD",bg:"#EEEDFE",dark:"#26215C",mid:"#534AB7",border:"#AFA9EC",ring:"#7F77DD"},
  star3:{main:"#1D9E75",bg:"#E1F5EE",dark:"#04342C",mid:"#0F6E56",border:"#9FE1CB",ring:"#1D9E75"},
  star4:{main:"#D85A30",bg:"#FAECE7",dark:"#4A1B0C",mid:"#993C1D",border:"#F0997B",ring:"#D85A30"},
};
const GAME_LABELS={lotto:"大樂透",super:"威力彩",star3:"三星彩",star4:"四星彩"};
const GAME_SUB={lotto:"週二、五",super:"週一、四",star3:"每日",star4:"每日"};
const GAME_RULE={lotto:"49選6",super:"38選6＋8選1",star3:"3位數",star4:"4位數"};
const DIGIT_LABELS=["百位","十位","個位"];
const DIGIT4_LABELS=["千位","百位","十位","個位"];
const NEXT_INFO={
  lotto:{period:"115000053",date:"2025/05/20 二"},
  super:{period:"115000040",date:"2025/05/19 一"},
  star3:{period:"115000141",date:"2025/05/18"},
  star4:{period:"115000141",date:"2025/05/18"},
};
const PRIZE_TABLE={
  lotto:[
    {label:"頭獎",cond:"對中 6 個號碼",bg:"#0C447C",color:"#E6F1FB"},
    {label:"貳獎",cond:"5 個＋特別號",amt:"約 240 萬",bg:"#185FA5",color:"#E6F1FB"},
    {label:"參獎",cond:"對中 5 個號碼",amt:"約 4.5 萬",bg:"#378ADD",color:"#E6F1FB"},
    {label:"肆獎",cond:"4 個＋特別號",amt:"約 2,000 元",bg:"#85B7EB",color:"#042C53"},
    {label:"伍獎",cond:"對中 4 個號碼",amt:"固定 2,000 元",bg:"#B5D4F4",color:"#042C53"},
    {label:"陸獎",cond:"3 個＋特別號",amt:"固定 1,000 元",bg:"#D3D1C7",color:"#2C2C2A"},
    {label:"柒獎",cond:"2 個＋特別號",amt:"固定 400 元",bg:"#D3D1C7",color:"#2C2C2A"},
    {label:"普獎",cond:"對中 3 個號碼",amt:"固定 400 元",bg:"#D3D1C7",color:"#2C2C2A"},
  ],
  super:[
    {label:"頭獎",cond:"6個＋第二區",bg:"#26215C",color:"#EEEDFE"},
    {label:"貳獎",cond:"6 個（無第二區）",amt:"約 500 萬",bg:"#3C3489",color:"#EEEDFE"},
    {label:"參獎",cond:"5個＋第二區",amt:"約 10 萬",bg:"#534AB7",color:"#EEEDFE"},
    {label:"肆獎",cond:"對中 5 個號碼",amt:"約 4,000 元",bg:"#7F77DD",color:"#EEEDFE"},
    {label:"伍獎",cond:"4個＋第二區",amt:"固定 2,000 元",bg:"#AFA9EC",color:"#26215C"},
    {label:"陸獎",cond:"對中 4 個號碼",amt:"固定 800 元",bg:"#CECBF6",color:"#26215C"},
    {label:"柒獎",cond:"3個＋第二區",amt:"固定 400 元",bg:"#D3D1C7",color:"#2C2C2A"},
    {label:"普獎",cond:"對中 3 個號碼",amt:"固定 400 元",bg:"#D3D1C7",color:"#2C2C2A"},
  ],
  star3:[
    {label:"頭獎",cond:"對中 3 位數（順序）",amt:"固定 5,000 元",bg:"#0F6E56",color:"#E1F5EE"},
    {label:"貳獎",cond:"對中前兩位",amt:"固定 500 元",bg:"#1D9E75",color:"#E1F5EE"},
    {label:"參獎",cond:"對中後兩位",amt:"固定 300 元",bg:"#5DCAA5",color:"#04342C"},
    {label:"肆獎",cond:"對中任意兩位",amt:"固定 50 元",bg:"#9FE1CB",color:"#04342C"},
  ],
  star4:[
    {label:"頭獎",cond:"對中 4 位數（順序）",amt:"固定 20,000 元",bg:"#712B13",color:"#FAECE7"},
    {label:"貳獎",cond:"對中前三位",amt:"固定 2,000 元",bg:"#993C1D",color:"#FAECE7"},
    {label:"參獎",cond:"對中後三位",amt:"固定 1,000 元",bg:"#D85A30",color:"#FAECE7"},
    {label:"肆獎",cond:"對中前兩位",amt:"固定 500 元",bg:"#F0997B",color:"#4A1B0C"},
    {label:"伍獎",cond:"對中後兩位",amt:"固定 300 元",bg:"#F5C4B3",color:"#4A1B0C"},
  ],
};
const JACKPOT={
  lotto:{jackpot:"3.2 億元",streak:4,next:"05/20 二",sales:"8,640 萬",totalPrize:"4,838 萬",prob:"1/1,398萬"},
  super:{jackpot:"8.5 億元",streak:7,next:"05/19 一",sales:"12,800 萬",totalPrize:"7,168 萬",prob:"1/2,209萬"},
};

// ═══════════════════════════════════════════════════
// 共用小元件
// ═══════════════════════════════════════════════════
function Tag({children,bg,color}){
  return <span style={{fontSize:10,padding:"1px 7px",borderRadius:6,background:bg,color,display:"inline-block",whiteSpace:"nowrap"}}>{children}</span>;
}
function Badge({children,bg,color,style={}}){
  return <span style={{fontSize:11,padding:"2px 9px",borderRadius:6,background:bg,color,display:"inline-block",whiteSpace:"nowrap",...style}}>{children}</span>;
}
function Divider(){return <div style={{borderTop:"0.5px solid var(--cb)",margin:"12px 0"}}/>;}
function MetricCard({label,value,sub,valColor}){
  return(
    <div style={{background:"var(--cs)",borderRadius:8,padding:"9px 11px"}}>
      <div style={{fontSize:10,color:"var(--ct2)",marginBottom:3}}>{label}</div>
      <div style={{fontSize:14,fontWeight:500,color:valColor||"var(--ct)"}}>{value}</div>
      {sub&&<div style={{fontSize:10,color:"var(--ct2)",marginTop:1}}>{sub}</div>}
    </div>
  );
}
function SectionLabel({icon,text,sub}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:6,margin:"18px 0 9px",fontSize:11,color:"var(--ct2)"}}>
      <span>{icon}</span>
      <span style={{fontWeight:500,fontSize:13,color:"var(--ct)"}}>{text}</span>
      {sub&&<span style={{fontSize:10}}>{sub}</span>}
    </div>
  );
}

// 環形信心指數
function RingBall({num, confidence, ringColor, ballColor, textColor}){
  const R=24, C=2*Math.PI*R;
  const offset=C*(1-confidence/100);
  return(
    <svg width="58" height="58" viewBox="0 0 58 58" style={{flexShrink:0}}
      role="img" aria-label={`號碼${num}信心指數${confidence}%`}>
      <circle cx="29" cy="29" r={R} fill="none" stroke={ringColor+"33"} strokeWidth="6"/>
      <circle cx="29" cy="29" r={R} fill="none" stroke={ringColor} strokeWidth="6"
        strokeDasharray={C.toFixed(1)} strokeDashoffset={offset.toFixed(1)}
        strokeLinecap="round" transform="rotate(-90 29 29)"/>
      <circle cx="29" cy="29" r="18" fill={ballColor}/>
      <text x="29" y="33" textAnchor="middle" fontSize="13" fontWeight="500" fill={textColor}>
        {String(num).padStart(2,"0")}
      </text>
    </svg>
  );
}

// 五維分數條
function DimBars({dim}){
  const dims=[
    {label:"熱號",val:dim.hot,color:"#EF9F27"},
    {label:"遺漏",val:dim.miss,color:"#378ADD"},
    {label:"區間",val:dim.zone??55,color:"#1D9E75"},
    {label:"尾數",val:dim.tail??60,color:"#7F77DD"},
    {label:"奇偶",val:dim.oe??70,color:"#D85A30"},
  ];
  return(
    <div style={{marginBottom:6}}>
      {dims.map(d=>(
        <div key={d.label} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
          <span style={{fontSize:10,color:"var(--ct2)",minWidth:24}}>{d.label}</span>
          <div style={{flex:1,height:4,borderRadius:2,background:"var(--cs)",overflow:"hidden"}}>
            <div style={{width:`${d.val}%`,height:"100%",borderRadius:2,background:d.color}}/>
          </div>
          <span style={{fontSize:10,color:"var(--ct2)",minWidth:20,textAlign:"right"}}>{d.val}</span>
        </div>
      ))}
    </div>
  );
}

// 號碼卡片（大樂透/威力彩用）
function BallCard({r, color}){
  const advColor = Number(r.advantage)>=3?"#27500A": Number(r.advantage)>=2?"#185FA5":"#888";
  return(
    <div style={{background:"var(--cc)",border:`1px solid ${color.border}`,
      borderRadius:12,padding:"14px 12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <RingBall num={r.num} confidence={r.confidence}
          ringColor={color.ring} ballColor={color.main} textColor={color.bg}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:22,fontWeight:500,color:color.dark,lineHeight:1}}>{r.confidence}%</div>
          <div style={{fontSize:11,color:"var(--ct2)",marginBottom:3}}>信心指數</div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:14,fontWeight:500,color:advColor}}>×{r.advantage}</span>
            <span style={{fontSize:10,color:"var(--ct2)"}}>優勢倍數</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
        {r.isHot
          ? <Tag bg="#FAEEDA" color="#633806">🔥 熱號</Tag>
          : <Tag bg="#E6F1FB" color="#0C447C">❄️ 遺漏</Tag>}
        {r.rank<=5 && <Tag bg="#FCEBEB" color="#A32D2D">第{r.rank}高</Tag>}
        {r.isMiss && <Tag bg="#E6F1FB" color="#0C447C">遺漏{r.missing}期</Tag>}
        {r.zoneLow && <Tag bg="#EAF3DE" color="#27500A">區間補位</Tag>}
      </div>
      <DimBars dim={r.dim}/>
      <div style={{fontSize:10,color:"var(--ct2)",lineHeight:1.5,marginTop:4}}>{r.reason}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 預測區塊（大樂透 / 威力彩）
// ═══════════════════════════════════════════════════
function PredictBlock649({analysis,hotWeight,setHotWeight,recentN,setRecentN,color,isSuper}){
  const {recWithStats,groupConf,totalPeriods,recentN:aN}=analysis;
  const dimLegend=[
    {color:"#EF9F27",label:"熱號"},
    {color:"#378ADD",label:"遺漏"},
    {color:"#1D9E75",label:"區間"},
    {color:"#7F77DD",label:"尾數"},
    {color:"#D85A30",label:"奇偶"},
  ];
  return(
    <div style={{border:`1px solid ${color.border}`,borderRadius:12,padding:16,marginBottom:10,background:"var(--cc)"}}>

      {/* 組合信心橫幅 */}
      <div style={{background:color.bg,borderRadius:10,padding:"12px 16px",marginBottom:14,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:11,color:color.mid,marginBottom:3}}>本組合綜合信心指數</div>
          <div style={{fontSize:32,fontWeight:500,color:color.dark,lineHeight:1.1}}>{groupConf}%</div>
          <div style={{fontSize:11,color:color.mid,marginTop:4}}>五維加權 · 近 {aN} 期資料</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
          <Badge bg={color.dark} color={color.bg} style={{fontSize:12}}>
            {groupConf>=85?"高度推薦":groupConf>=75?"推薦":"參考"}
          </Badge>
          <Badge bg="var(--cs)" color="var(--ct2)">分析 {totalPeriods} 期</Badge>
          <Badge bg="var(--cs)" color="var(--ct2)">熱號 {hotWeight}% · 遺漏 {100-hotWeight}%</Badge>
        </div>
      </div>

      {/* 雙滑桿 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div>
          <div style={{fontSize:11,color:"var(--ct2)",marginBottom:5}}>
            🔥 熱號 {hotWeight}%　❄️ 遺漏 {100-hotWeight}%
          </div>
          <input type="range" min={10} max={90} step={5} value={hotWeight}
            onChange={e=>setHotWeight(Number(e.target.value))}
            style={{width:"100%",accentColor:color.main}}/>
        </div>
        <div>
          <div style={{fontSize:11,color:"var(--ct2)",marginBottom:5}}>
            📊 近期參考期數：{recentN} 期
          </div>
          <input type="range" min={10} max={Math.min(55,totalPeriods)} step={5} value={recentN}
            onChange={e=>setRecentN(Number(e.target.value))}
            style={{width:"100%",accentColor:color.main}}/>
        </div>
      </div>

      {/* 6 顆卡片 3x2 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10,marginBottom:12}}>
        {recWithStats.map(r=><BallCard key={r.num} r={r} color={color}/>)}
      </div>

      {/* 威力彩第二區 */}
      {isSuper&&(
        <div style={{background:"var(--cs)",borderRadius:8,padding:"10px 14px",
          marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:"var(--ct2)"}}>第二區推薦</span>
          <div style={{width:38,height:38,borderRadius:"50%",background:"#E24B4A",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:15,fontWeight:500,color:"#FCEBEB"}}>
            {String(analysis.recZ2).padStart(2,"0")}
          </div>
          <span style={{fontSize:14,fontWeight:500,color:"#A32D2D"}}>{analysis.z2pct}%</span>
          <Tag bg="#FCEBEB" color="#A32D2D">1–8 最高機率</Tag>
        </div>
      )}

      {/* 圖例 */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:11,color:"var(--ct2)",marginBottom:10}}>
        {dimLegend.map(d=>(
          <span key={d.label} style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:10,height:4,borderRadius:2,background:d.color,display:"inline-block"}}/>
            {d.label}
          </span>
        ))}
      </div>

      {/* 統計摘要 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
        <MetricCard label="分析全期" value={`${totalPeriods} 期`}/>
        <MetricCard label="近期參考" value={`${aN} 期`}/>
        <MetricCard label="熱號權重" value={`${hotWeight}%`}/>
        <MetricCard label="組合信心" value={`${groupConf}%`} valColor={color.dark}/>
      </div>
      <div style={{padding:"8px 10px",background:"var(--cs)",borderRadius:8,
        borderLeft:"3px solid var(--cb)",fontSize:11,color:"var(--ct2)"}}>
        ⚠️ 信心指數為統計加權優勢值，非真實中獎率，每期開獎均為獨立隨機事件，請理性投注。
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 預測區塊（三星彩 / 四星彩）
// ═══════════════════════════════════════════════════
function PredictBlockStar({analysis,digits,color}){
  const labels=digits===3?DIGIT_LABELS:DIGIT4_LABELS;
  const {groupConf,totalPeriods}=analysis;
  return(
    <div style={{border:`1px solid ${color.border}`,borderRadius:12,padding:16,marginBottom:10,background:"var(--cc)"}}>
      {/* 組合信心 */}
      <div style={{background:color.bg,borderRadius:10,padding:"12px 16px",marginBottom:14,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:11,color:color.mid,marginBottom:3}}>本組合綜合信心指數</div>
          <div style={{fontSize:32,fontWeight:500,color:color.dark,lineHeight:1.1}}>{groupConf}%</div>
          <div style={{fontSize:11,color:color.mid,marginTop:4}}>各位數獨立計算 · {totalPeriods} 期資料</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
          <Badge bg={color.dark} color={color.bg} style={{fontSize:12}}>
            {groupConf>=80?"高度推薦":groupConf>=70?"推薦":"參考"}
          </Badge>
        </div>
      </div>

      {/* 各位數卡片 */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${digits},minmax(0,1fr))`,gap:10,marginBottom:12}}>
        {analysis.rec.map((r,d)=>(
          <div key={d} style={{background:"var(--cc)",border:`1px solid ${color.border}`,borderRadius:12,padding:"14px 12px"}}>
            <div style={{fontSize:11,color:"var(--ct2)",marginBottom:8,textAlign:"center"}}>{labels[d]}</div>
            {/* 環形 */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
              <RingBall num={r.best} confidence={r.confidence}
                ringColor={color.ring} ballColor={color.main} textColor={color.bg}/>
            </div>
            <div style={{textAlign:"center",marginBottom:8}}>
              <div style={{fontSize:20,fontWeight:500,color:color.dark,lineHeight:1}}>{r.confidence}%</div>
              <div style={{fontSize:10,color:"var(--ct2)"}}>信心指數</div>
              <div style={{fontSize:13,fontWeight:500,color:"#27500A",marginTop:3}}>×{r.advantage} 優勢</div>
            </div>
            {/* 前三候選 */}
            {r.top3.map((t,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,
                padding:"4px 0",borderBottom:i<2?"0.5px solid var(--cb)":"none"}}>
                <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,
                  background:i===0?color.main:"var(--cs)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:500,color:i===0?color.bg:"var(--ct)"}}>
                  {t.num}
                </div>
                <div style={{flex:1,height:4,borderRadius:2,background:"var(--cs)",overflow:"hidden"}}>
                  <div style={{width:`${(t.freq/totalPeriods*10)*100}%`,height:"100%",
                    background:i===0?color.main:"#B4B2A9",borderRadius:2}}/>
                </div>
                <span style={{fontSize:10,color:"var(--ct2)",minWidth:28}}>{t.freq}次</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{padding:"8px 10px",background:"var(--cs)",borderRadius:8,
        borderLeft:"3px solid var(--cb)",fontSize:11,color:"var(--ct2)"}}>
        ⚠️ 各位數獨立計算，統計 {totalPeriods} 期，僅供參考，請理性投注。
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 獎額區塊
// ═══════════════════════════════════════════════════
function PrizeBlock({game,color}){
  const info=JACKPOT[game]; const table=PRIZE_TABLE[game];
  return(
    <div style={{border:`1px solid ${color.border}`,borderRadius:12,padding:16,marginBottom:10,background:"var(--cc)"}}>
      {info&&(
        <>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,color:"var(--ct2)",marginBottom:4}}>頭獎累積獎金</div>
              <div style={{fontSize:30,fontWeight:500,color:color.dark,lineHeight:1}}>{info.jackpot}</div>
              <div style={{fontSize:11,color:"#E24B4A",marginTop:5}}>🔥 連續 {info.streak} 期無人中頭獎</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
              <Badge bg="#FCEBEB" color="#A32D2D">下期 {info.next}</Badge>
              <Badge bg="#EAF3DE" color="#27500A">頭獎保證 1 億起</Badge>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
            <MetricCard label="本期銷售額" value={info.sales}/>
            <MetricCard label="總獎金 56%" value={info.totalPrize}/>
            <MetricCard label="本期頭獎" value={info.jackpot} valColor={color.dark}/>
            <MetricCard label="中頭獎機率" value={info.prob}/>
          </div>
        </>
      )}
      {!info&&(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,color:"var(--ct2)",marginBottom:4}}>獎金說明</div>
          <div style={{fontSize:13,color:"var(--ct)"}}>每日開獎，固定獎金制，對中即可兌獎。</div>
        </div>
      )}
      <div style={{background:"var(--cs)",borderRadius:8,padding:"10px 12px"}}>
        <div style={{fontSize:11,color:"var(--ct2)",marginBottom:8}}>各獎項中獎條件與獎金</div>
        {table.map((p,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"6px 0",borderBottom:i<table.length-1?"0.5px solid var(--cb)":"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Badge bg={p.bg} color={p.color} style={{fontSize:10}}>{p.label}</Badge>
              <span style={{fontSize:12,color:"var(--ct2)"}}>{p.cond}</span>
            </div>
            <span style={{fontSize:13,fontWeight:500,color:i===0?color.dark:"var(--ct)"}}>
              {i===0&&info?info.jackpot+"（累積）":p.amt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 歷史列表（大樂透 / 威力彩）
// ═══════════════════════════════════════════════════
function HistoryBlock649({data,rec,color}){
  const [yearFilter,setYearFilter]=useState("全部");
  const [page,setPage]=useState(0);
  const PAGE=10;
  const years=useMemo(()=>["全部",...[...new Set(data.map(r=>r[1].slice(0,4)))].sort((a,b)=>b-a)],[data]);
  const filtered=useMemo(()=>yearFilter==="全部"?data:data.filter(r=>r[1].startsWith(yearFilter)),[data,yearFilter]);
  const paged=filtered.slice(page*PAGE,(page+1)*PAGE);
  const total=Math.ceil(filtered.length/PAGE);
  return(
    <div style={{background:"var(--cc)",border:"0.5px solid var(--cb)",borderRadius:12,overflow:"hidden",marginBottom:10}}>
      <div style={{padding:"10px 14px",borderBottom:"0.5px solid var(--cb)",
        display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:11,color:"var(--ct2)"}}>年份：</span>
        {years.map(y=>(
          <button key={y} onClick={()=>{setYearFilter(y);setPage(0);}}
            style={{padding:"2px 10px",borderRadius:20,fontSize:11,cursor:"pointer",border:"0.5px solid",
              borderColor:yearFilter===y?color.main:"var(--cb)",
              background:yearFilter===y?color.bg:"transparent",
              color:yearFilter===y?color.dark:"var(--ct2)"}}>
            {y}
          </button>
        ))}
        <span style={{marginLeft:"auto",fontSize:11,color:"var(--ct2)"}}>共 {filtered.length} 期</span>
      </div>
      <div style={{padding:"4px 14px"}}>
        {paged.map((r,idx)=>{
          const balls=[r[2],r[3],r[4],r[5],r[6],r[7]];
          const match=balls.filter(n=>rec.includes(n)).length;
          const won=r[9]>0;
          return(
            <div key={r[0]} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",
              borderBottom:idx<paged.length-1?"0.5px solid var(--cb)":"none",
              background:won?"var(--csg)":"transparent",
              borderRadius:won?8:0,margin:won?"2px -4px":0,
              paddingLeft:won?4:0,paddingRight:won?4:0}}>
              <div style={{minWidth:88}}>
                <div style={{fontSize:12,fontWeight:500,color:"var(--ct)"}}>{r[0]}</div>
                <div style={{fontSize:10,color:"var(--ct2)"}}>{r[1]}</div>
              </div>
              <div style={{display:"flex",gap:4,flex:1,alignItems:"center",flexWrap:"wrap"}}>
                {balls.map((n,i)=>(
                  <div key={i} style={{width:28,height:28,borderRadius:"50%",
                    background:rec.includes(n)?"#EF9F27":color.main,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:11,fontWeight:500,color:rec.includes(n)?"#412402":color.bg}}>
                    {String(n).padStart(2,"0")}
                  </div>
                ))}
                <div style={{width:1,height:20,background:"var(--cb)",margin:"0 2px"}}/>
                <div style={{width:28,height:28,borderRadius:"50%",background:"#E24B4A",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:11,fontWeight:500,color:"#FCEBEB"}}>
                  {String(r[8]).padStart(2,"0")}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,minWidth:72}}>
                <Badge
                  bg={match>=3?"#FAEEDA":match>0?"#F1EFE8":"var(--cs)"}
                  color={match>=3?"#633806":match>0?"#444":"var(--ct2)"}>
                  命中 {match} 顆
                </Badge>
                {won
                  ?<span style={{fontSize:10,color:"var(--cst)",fontWeight:500}}>🏆 頭獎 {r[9]} 注！</span>
                  :<span style={{fontSize:10,color:"var(--ct2)"}}>頭獎無人中</span>}
              </div>
            </div>
          );
        })}
      </div>
      {total>1&&(
        <div style={{display:"flex",justifyContent:"center",gap:8,padding:"10px 0",borderTop:"0.5px solid var(--cb)"}}>
          <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}
            style={{padding:"4px 14px",borderRadius:6,fontSize:12,cursor:"pointer",
              border:"0.5px solid var(--cb)",background:"transparent",color:"var(--ct2)",opacity:page===0?0.4:1}}>
            ‹ 上頁
          </button>
          <span style={{fontSize:12,color:"var(--ct2)",padding:"4px 8px"}}>{page+1} / {total}</span>
          <button onClick={()=>setPage(p=>Math.min(total-1,p+1))} disabled={page>=total-1}
            style={{padding:"4px 14px",borderRadius:6,fontSize:12,cursor:"pointer",
              border:"0.5px solid var(--cb)",background:"transparent",color:"var(--ct2)",opacity:page>=total-1?0.4:1}}>
            下頁 ›
          </button>
        </div>
      )}
    </div>
  );
}

// 三星四星歷史
function HistoryBlockStar({data,digits,rec,color}){
  const labels=digits===3?DIGIT_LABELS:DIGIT4_LABELS;
  const [page,setPage]=useState(0);
  const PAGE=10;
  const paged=data.slice(page*PAGE,(page+1)*PAGE);
  const total=Math.ceil(data.length/PAGE);
  return(
    <div style={{background:"var(--cc)",border:"0.5px solid var(--cb)",borderRadius:12,overflow:"hidden",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",
        borderBottom:"0.5px solid var(--cb)",background:"var(--cs)"}}>
        <span style={{minWidth:88,fontSize:11,color:"var(--ct2)"}}>期別</span>
        {labels.map((l,i)=><span key={i} style={{flex:1,textAlign:"center",fontSize:11,color:"var(--ct2)"}}>{l}</span>)}
        <span style={{fontSize:11,color:"var(--ct2)",minWidth:60,textAlign:"right"}}>命中</span>
      </div>
      <div style={{padding:"4px 14px"}}>
        {paged.map((r,idx)=>{
          const arr=Array.from({length:digits},(_,d)=>r[2+d]);
          const match=arr.filter((n,d)=>rec[d]?.best===n).length;
          return(
            <div key={r[0]} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",
              borderBottom:idx<paged.length-1?"0.5px solid var(--cb)":"none"}}>
              <div style={{minWidth:88}}>
                <div style={{fontSize:12,fontWeight:500,color:"var(--ct)"}}>{r[0]}</div>
                <div style={{fontSize:10,color:"var(--ct2)"}}>{r[1]}</div>
              </div>
              {arr.map((n,d)=>(
                <div key={d} style={{flex:1,display:"flex",justifyContent:"center"}}>
                  <div style={{width:36,height:42,borderRadius:8,display:"flex",
                    alignItems:"center",justifyContent:"center",
                    background:rec[d]?.best===n?color.main:"var(--cs)",
                    border:`0.5px solid ${rec[d]?.best===n?color.main:"var(--cb)"}`}}>
                    <span style={{fontSize:16,fontWeight:500,
                      color:rec[d]?.best===n?color.bg:"var(--ct)"}}>{n}</span>
                  </div>
                </div>
              ))}
              <div style={{minWidth:60,textAlign:"right"}}>
                <Badge
                  bg={match===digits?"#EAF3DE":match>0?"#FAEEDA":"var(--cs)"}
                  color={match===digits?"#27500A":match>0?"#633806":"var(--ct2)"}>
                  {match}/{digits}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      {total>1&&(
        <div style={{display:"flex",justifyContent:"center",gap:8,padding:"10px 0",borderTop:"0.5px solid var(--cb)"}}>
          <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}
            style={{padding:"4px 14px",borderRadius:6,fontSize:12,cursor:"pointer",
              border:"0.5px solid var(--cb)",background:"transparent",color:"var(--ct2)",opacity:page===0?0.4:1}}>
            ‹ 上頁
          </button>
          <span style={{fontSize:12,color:"var(--ct2)",padding:"4px 8px"}}>{page+1} / {total}</span>
          <button onClick={()=>setPage(p=>Math.min(total-1,p+1))} disabled={page>=total-1}
            style={{padding:"4px 14px",borderRadius:6,fontSize:12,cursor:"pointer",
              border:"0.5px solid var(--cb)",background:"transparent",color:"var(--ct2)",opacity:page>=total-1?0.4:1}}>
            下頁 ›
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 主應用
// ═══════════════════════════════════════════════════
export default function TaiwanLottery(){
  const [game,setGame]=useState("lotto");
  const [hotWeight,setHotWeight]=useState(60);
  const [recentN,setRecentN]=useState(30);
  const color=COLORS[game];

  const lotto649=useMemo(()=>analyzeLotto649(LOTTO649_DATA,hotWeight/100,recentN),[hotWeight,recentN]);
  const superLotto=useMemo(()=>analyzeSuperLotto(SUPERLOTTO_DATA,hotWeight/100,recentN),[hotWeight,recentN]);
  const star3=useMemo(()=>analyzeStar(STAR3_DATA,3),[]);
  const star4=useMemo(()=>analyzeStar(STAR4_DATA,4),[]);

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`
      :root{
        --ct:#1a1a1a;--ct2:#888;--cc:#ffffff;--cs:#f5f5f4;--cb:rgba(0,0,0,0.1);
        --cst:#27500A;--csg:#EAF3DE;
      }
      @media(prefers-color-scheme:dark){:root{
        --ct:#e8e8e8;--ct2:#999;--cc:#1e1e1e;--cs:#2a2a2a;--cb:rgba(255,255,255,0.1);
        --cst:#68D391;--csg:#1a2e1a;
      }}
      *{box-sizing:border-box;margin:0;padding:0;}
      button{font-family:inherit;color:var(--ct);cursor:pointer;}
      input[type=range]{cursor:pointer;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  const info=NEXT_INFO[game];

  return(
    <div style={{maxWidth:680,margin:"0 auto",padding:"14px 16px",
      fontFamily:"'Segoe UI','Microsoft JhengHei',sans-serif",color:"var(--ct)"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div>
          <h1 style={{fontSize:18,fontWeight:500,margin:0,color:"var(--ct)"}}>台灣彩券分析系統</h1>
          <p style={{fontSize:11,color:"var(--ct2)",margin:0}}>五維統計加權 · 環形信心指數 · v3.0</p>
        </div>
        <Badge bg={color.bg} color={color.dark}>最終版</Badge>
      </div>

      {/* 彩券切換 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:14}}>
        {["lotto","super","star3","star4"].map(g=>(
          <button key={g} onClick={()=>setGame(g)}
            style={{padding:"9px 4px",borderRadius:10,textAlign:"center",
              border:game===g?`2px solid ${COLORS[g].main}`:"0.5px solid var(--cb)",
              background:game===g?COLORS[g].bg:"var(--cc)",transition:"all .15s"}}>
            <div style={{fontSize:12,fontWeight:500,color:game===g?COLORS[g].dark:"var(--ct)"}}>
              {GAME_LABELS[g]}
            </div>
            <div style={{fontSize:10,color:game===g?COLORS[g].mid:"var(--ct2)"}}>{GAME_SUB[g]}</div>
            <div style={{fontSize:9,color:"var(--ct2)",marginTop:1}}>{GAME_RULE[g]}</div>
          </button>
        ))}
      </div>

      {/* 期別 */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div>
          <span style={{fontSize:15,fontWeight:500,color:"var(--ct)"}}>第 {info.period} 期預測</span>
          <span style={{fontSize:11,color:"var(--ct2)",marginLeft:8}}>開獎日 {info.date}</span>
        </div>
      </div>

      {/* 預測 */}
      {game==="lotto"&&<PredictBlock649 analysis={lotto649}
        hotWeight={hotWeight} setHotWeight={setHotWeight}
        recentN={recentN} setRecentN={setRecentN} color={color} isSuper={false}/>}
      {game==="super"&&<PredictBlock649 analysis={superLotto}
        hotWeight={hotWeight} setHotWeight={setHotWeight}
        recentN={recentN} setRecentN={setRecentN} color={color} isSuper={true}/>}
      {game==="star3"&&<PredictBlockStar analysis={star3} digits={3} color={color}/>}
      {game==="star4"&&<PredictBlockStar analysis={star4} digits={4} color={color}/>}

      {/* 獎額 */}
      <SectionLabel icon="🏆" text="目前累積獎額" sub={`第 ${info.period} 期`}/>
      <PrizeBlock game={game} color={color}/>

      {/* 歷史 */}
      <SectionLabel icon="📜" text="歷屆開獎號碼"
        sub={game==="lotto"||game==="super"?"金色球 = 命中推薦號":"綠底 = 命中推薦數字"}/>
      {game==="lotto"&&<HistoryBlock649 data={LOTTO649_DATA} rec={lotto649.rec} color={color}/>}
      {game==="super"&&<HistoryBlock649 data={SUPERLOTTO_DATA} rec={superLotto.rec1} color={color}/>}
      {game==="star3"&&<HistoryBlockStar data={STAR3_DATA} digits={3} rec={star3.rec} color={color}/>}
      {game==="star4"&&<HistoryBlockStar data={STAR4_DATA} digits={4} rec={star4.rec} color={color}/>}

      <div style={{textAlign:"center",padding:"12px 0 4px",fontSize:11,color:"var(--ct2)"}}>
        資料僅供統計參考 · 請理性投注 · 未滿 18 歲請勿購買彩券
      </div>
    </div>
  );
}
