#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Точечный визуальный рендер новых векторных слайдов Урока 2 (branchStrip,
divRow, completeGraph K6, complementBars) — чтобы сверить глазами без LibreOffice."""
import os, math
from PIL import Image, ImageDraw, ImageFont

LES = "/home/user/amc8-pipeline/modul-a-fundament/urok-02-podschet-2-p1"
OUT = os.path.join(LES, "_preview")
os.makedirs(OUT, exist_ok=True)
S = 120
W, Hh = round(13.333*S), round(7.5*S)
C = dict(CREAM=(0xF5,0xEF,0xE3), AMBER=(0xF0,0xB8,0x4A), TEAL=(0x5B,0xC4,0xBC),
         RED=(0xE8,0x61,0x5E), MUTED=(0xA8,0xB4,0xD4), PANEL=(0x08,0x0E,0x22),
         DARK=(0x12,0x1A,0x33), CARD=(0x1C,0x27,0x47))
SANS="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANSB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SERIF="/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
_fc={}
def F(pt, b=False, h=False):
    px=max(9,round(pt*S/72.0)); k=(px,b,h)
    if k not in _fc: _fc[k]=ImageFont.truetype(SERIF if h else (SANSB if b else SANS), px)
    return _fc[k]
def ctext(d,x,y,w,hh,s,f,col,anchor="mm"):
    cx=(x+w/2)*S; cy=(y+hh/2)*S
    d.text((cx,cy),s,font=f,fill=col,anchor=anchor)
def ltext(d,x,y,s,f,col): d.text((x*S,y*S),s,font=f,fill=col,anchor="lm")

def title(d,t,sub=None):
    d.text((0.8*S,0.7*S),t,font=F(32,h=True),fill=C["CREAM"],anchor="lm")
    if sub: d.text((0.8*S,1.35*S),sub,font=F(14),fill=C["MUTED"],anchor="lm")

def branchStrip(d,x,y,counts,joiner,result):
    bw,gap=0.72,0.5
    for i,n in enumerate(counts):
        bx=x+i*(bw+gap)
        d.rounded_rectangle([bx*S,y*S,(bx+bw)*S,(y+bw)*S],radius=8,fill=C["CARD"],outline=C["AMBER"],width=2)
        ctext(d,bx,y,bw,bw,str(n),F(22,h=True),C["CREAM"])
        if i<len(counts)-1: ctext(d,bx+bw,y,gap,bw,joiner,F(20,h=True),C["AMBER"])
    ex=x+len(counts)*(bw+gap)
    d.text((ex*S,(y+bw/2)*S),"= "+result,font=F(24,h=True),fill=C["AMBER"],anchor="lm")

def divRow(d,x,y,a,b,q):
    ctext(d,x,y,11.3,1.0,f"{a}   ÷   {b}   =   {q}",F(32,h=True),C["AMBER"])

def completeGraph(d,cx,cy,r,n):
    pts=[]
    for i in range(n):
        a=-math.pi/2+2*math.pi*i/n
        pts.append((cx+r*math.cos(a), cy+r*math.sin(a)))
    e=0
    for i in range(n):
        for j in range(i+1,n):
            d.line([pts[i][0]*S,pts[i][1]*S,pts[j][0]*S,pts[j][1]*S],fill=C["TEAL"],width=2); e+=1
    for (px,py) in pts:
        d.ellipse([(px-0.13)*S,(py-0.13)*S,(px+0.13)*S,(py+0.13)*S],fill=C["AMBER"],outline=C["CREAM"])
    return e

def complementBars(d,x,y,total,none,result):
    scale=2.9/total; bw,gap=1.5,1.5
    bars=[(total,C["CARD"],"всего"),(none,C["RED"],"без золота"),(result,C["AMBER"],"хотя бы 1")]
    baseY=y+3.1
    for i,(v,col,cap) in enumerate(bars):
        bx=x+i*(bw+gap); hh=max(v*scale,0.3)
        d.rectangle([bx*S,(baseY-hh)*S,(bx+bw)*S,baseY*S],fill=col,outline=C["CREAM"],width=2)
        ctext(d,bx,baseY-hh-0.5,bw,0.45,str(v),F(22,h=True),C["CREAM"])
        ctext(d,bx-0.2,baseY+0.1,bw+0.4,0.4,cap,F(12),C["MUTED"])
        if i<2: ctext(d,bx+bw,baseY-1.2,gap,0.6,"−" if i==0 else "=",F(28,h=True),C["AMBER"])

def base():
    im=Image.new("RGB",(W,Hh),C["DARK"]); return im, ImageDraw.Draw(im)

# слайд 5
im,d=base(); title(d,"Дерево-по-местам","1-е кресло: 6 · 2-е: 5 · 3-е: 4")
branchStrip(d,1.4,2.7,[6,5,4],"×","120")
ctext(d,1.0,5.0,11.3,0.7,"Но АБВ, АВБ, БАВ, БВА, ВАБ, ВБА — одна команда…",F(19),C["AMBER"])
im.save(os.path.join(OUT,"s05.png"))

# слайд 7
im,d=base(); title(d,"Одну тройку переставить можно 3! = 6 способами")
for i,p in enumerate(["АБВ","АВБ","БАВ","БВА","ВАБ","ВБА"]):
    bx=1.2+i*1.9
    d.rounded_rectangle([bx*S,2.3*S,(bx+1.6)*S,3.0*S],radius=8,fill=C["CARD"],outline=C["MUTED"],width=2)
    ctext(d,bx,2.3,1.6,0.7,p,F(18,b=True),C["CREAM"])
ctext(d,1.0,3.25,11.3,0.6,"↓  всё это ОДНА команда",F(18),C["MUTED"])
divRow(d,1.0,4.1,120,6,20)
ctext(d,1.0,5.35,11.3,0.6,"делим на 3! = 6",F(17),C["AMBER"])
im.save(os.path.join(OUT,"s07.png"))

# слайд 12 (граф K6) — панель сверху
im,d=base()
if os.path.exists(os.path.join(LES,"img","img-04.png")):
    pic=Image.open(os.path.join(LES,"img","img-04.png")).convert("RGB").resize((W,Hh)); im.paste(pic,(0,0))
d=ImageDraw.Draw(im)
# панель
ov=Image.new("RGBA",(round(12.3*S),round(2.5*S)),(*C["PANEL"],220)); im.paste(Image.alpha_composite(im.crop((round(0.5*S),round(0.4*S),round(12.8*S),round(2.9*S))).convert("RGBA"),ov).convert("RGB"),(round(0.5*S),round(0.4*S)))
d=ImageDraw.Draw(im)
d.text((0.9*S,0.85*S),"Маскировка: рукопожатия — тот же выбор двоих",font=F(24,h=True),fill=C["AMBER"],anchor="lm")
d.text((0.9*S,1.5*S),"Обмен А↔Б — это пара {А,Б}.  C(6,2) = 6·5 / 2 = 15.",font=F(17),fill=C["CREAM"],anchor="lm")
e=completeGraph(d,11.0,1.65,0.95,6)
d.text((11.0*S,2.75*S),f"K6: {e} рёбер",font=F(12),fill=C["TEAL"],anchor="mm")
im.save(os.path.join(OUT,"s12.png"))

# слайд 13 (столбики дополнения)
im,d=base()
d.text((0.85*S,0.9*S),"Граница: «хотя бы один» золотой",font=F(23,h=True),fill=C["AMBER"],anchor="lm")
d.text((0.85*S,1.6*S),"3 значка из 4 обычных + 2 золотых → через противоположное:",font=F(16),fill=C["CREAM"],anchor="lm")
complementBars(d,1.1,2.6,20,4,16)
ctext(d,0.85,6.35,6.9,0.5,"всего − без золота = 20 − 4 = 16",F(17),C["AMBER"])
im.save(os.path.join(OUT,"s13.png"))

# слайд 15 (финал branchStrip)
im,d=base()
d.text((0.9*S,0.9*S),"Пара для разминки: 2 из 4 (без ролей)",font=F(22,h=True),fill=C["AMBER"],anchor="lm")
branchStrip(d,0.9,2.4,[4,3],"×","12 : 2! = 6")
ctext(d,0.9,4.0,6.0,0.6,"(A) 4  (B) 6  (C) 8  (D) 12  (E) 16",F(18),C["CREAM"],anchor="lm")
im.save(os.path.join(OUT,"s15.png"))

print("готово:", os.listdir(OUT))
