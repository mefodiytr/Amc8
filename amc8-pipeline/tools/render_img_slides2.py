#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Композит слайдов-с-картинками Урока 2 (картинка + полупрозрачная панель +
векторные наложения) по координатам deck.js — чтобы сверить, не наехала ли
панель на героиню и легли ли граф/столбики на спокойные зоны."""
import os, math
from PIL import Image, ImageDraw, ImageFont

LES = "/home/user/amc8-pipeline/modul-a-fundament/urok-02-podschet-2-p1"
IMGD = os.path.join(LES, "img")
OUT = os.path.join(LES, "_preview")
os.makedirs(OUT, exist_ok=True)
S = 120
W, Hh = round(13.333*S), round(7.5*S)
C = dict(CREAM=(0xF5,0xEF,0xE3), AMBER=(0xF0,0xB8,0x4A), TEAL=(0x5B,0xC4,0xBC),
         RED=(0xE8,0x61,0x5E), MUTED=(0xA8,0xB4,0xD4), PANEL=(0x08,0x0E,0x22))
SANS="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANSB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SERIF="/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
_fc={}
def F(pt,b=False,h=False):
    px=max(9,round(pt*S/72.0)); k=(px,b,h)
    if k not in _fc: _fc[k]=ImageFont.truetype(SERIF if h else (SANSB if b else SANS),px)
    return _fc[k]

def load(name):
    im=Image.new("RGB",(W,Hh),(18,26,51))
    p=os.path.join(IMGD,name)
    if os.path.exists(p):
        pic=Image.open(p).convert("RGB").resize((W,Hh)); im.paste(pic,(0,0))
    return im.convert("RGBA")

def panel(im,x,y,w,h,transp):
    # transp как в pptx: 0=непрозрачно..100=прозрачно; deckkit alpha ~ (100-transp)%
    alpha=round(255*(100-transp)/100)
    x0,y0=round(x*S),round(y*S)
    ov=Image.new("RGBA",(round(w*S),round(h*S)),(*C["PANEL"],alpha))
    im.alpha_composite(ov,(x0,y0))

def text(d,x,y,w,h,s,f,col,align="l",valign="t"):
    # простая укладка с переносом
    def wrap(txt):
        out=[]
        for para in txt.split("\n"):
            words=para.split(" "); line=""
            for wd in words:
                t=(line+" "+wd).strip()
                if d.textlength(t,font=f)<=w*S: line=t
                else: out.append(line); line=wd
            out.append(line)
        return out
    lines=wrap(s); lh=f.size*1.25
    ty=y*S + (0 if valign=="t" else (h*S-len(lines)*lh)/2)
    for ln in lines:
        tw=d.textlength(ln,font=f)
        tx=x*S if align=="l" else (x*S+(w*S-tw)/2 if align=="c" else x*S)
        d.text((tx,ty),ln,font=f,fill=col); ty+=lh

def completeGraph(d,cx,cy,r,n):
    pts=[]
    for i in range(n):
        a=-math.pi/2+2*math.pi*i/n
        pts.append((cx+r*math.cos(a),cy+r*math.sin(a)))
    for i in range(n):
        for j in range(i+1,n):
            d.line([pts[i][0]*S,pts[i][1]*S,pts[j][0]*S,pts[j][1]*S],fill=C["TEAL"],width=2)
    for (px,py) in pts:
        d.ellipse([(px-0.13)*S,(py-0.13)*S,(px+0.13)*S,(py+0.13)*S],fill=C["AMBER"],outline=C["CREAM"])

def branchStrip(d,x,y,counts,joiner,result):
    bw,gap=0.72,0.5
    for i,n in enumerate(counts):
        bx=x+i*(bw+gap)
        d.rounded_rectangle([bx*S,y*S,(bx+bw)*S,(y+bw)*S],radius=8,fill=(28,39,71),outline=C["AMBER"],width=2)
        d.text(((bx+bw/2)*S,(y+bw/2)*S),str(n),font=F(22,h=True),fill=C["CREAM"],anchor="mm")
        if i<len(counts)-1: d.text(((bx+bw+gap/2)*S,(y+bw/2)*S),joiner,font=F(20,h=True),fill=C["AMBER"],anchor="mm")
    ex=x+len(counts)*(bw+gap)
    d.text((ex*S,(y+bw/2)*S),"= "+result,font=F(24,h=True),fill=C["AMBER"],anchor="lm")

def complementBars(d,x,y,total,none,result):
    scale=2.9/total; bw,gap=1.5,1.5
    bars=[(total,(28,39,71),"всего"),(none,C["RED"],"без золота"),(result,C["AMBER"],"хотя бы 1")]
    baseY=y+3.1
    for i,(v,col,cap) in enumerate(bars):
        bx=x+i*(bw+gap); hh=max(v*scale,0.3)
        d.rectangle([bx*S,(baseY-hh)*S,(bx+bw)*S,baseY*S],fill=col,outline=C["CREAM"],width=2)
        d.text(((bx+bw/2)*S,(baseY-hh-0.28)*S),str(v),font=F(22,h=True),fill=C["CREAM"],anchor="mm")
        d.text(((bx+bw/2)*S,(baseY+0.3)*S),cap,font=F(12),fill=C["MUTED"],anchor="mm")
        if i<2: d.text(((bx+bw+gap/2)*S,(baseY-0.9)*S),"−" if i==0 else "=",font=F(28,h=True),fill=C["AMBER"],anchor="mm")

def save(im,name): im.convert("RGB").save(os.path.join(OUT,name))

# 8 · метафора
im=load("img-03.png"); d=ImageDraw.Draw(im,"RGBA")
panel(im,0.5,4.3,8.2,2.7,25); d=ImageDraw.Draw(im,"RGBA")
text(d,0.85,4.5,7.6,0.7,"Приём: СНЯТЬ ПОРЯДОК",F(27,h=True),C["AMBER"],valign="m")
text(d,0.85,5.35,7.6,1.5,"Посчитай упорядоченно (дерево): 6·5·4 = 120.\nПорядок не важен → раздели на k! = 3! = 6:  C(6,3) = 120 : 6 = 20.",F(18),C["CREAM"])
save(im,"slide-08.png")

# 12 · маскировка + граф
im=load("img-04.png"); d=ImageDraw.Draw(im,"RGBA")
panel(im,0.5,0.4,12.3,2.5,25); d=ImageDraw.Draw(im,"RGBA")
text(d,0.9,0.55,11.5,0.6,"Маскировка: рукопожатия — тот же выбор двоих",F(24,h=True),C["AMBER"])
text(d,0.9,1.25,8.4,1.5,"Каждая из 6 обменялась с каждой. Обмен А↔Б — это пара {А,Б}.\nC(6,2) = 6·5 / 2 = 15.  (30 = посчитала каждый обмен дважды)",F(17),C["CREAM"])
completeGraph(d,11.0,1.65,0.95,6)
save(im,"slide-12.png")

# 13 · граница + столбики
im=load("img-05.png"); d=ImageDraw.Draw(im,"RGBA")
panel(im,0.5,0.4,7.4,6.6,30); d=ImageDraw.Draw(im,"RGBA")
text(d,0.85,0.6,6.9,0.6,"Граница: «хотя бы один» золотой",F(23,h=True),C["AMBER"])
text(d,0.85,1.35,6.9,1.2,"3 значка из 4 обычных + 2 золотых.\nВ лоб не выбрать — считай через противоположное:",F(17),C["CREAM"])
complementBars(d,1.1,2.6,20,4,16)
text(d,0.85,6.35,6.9,0.5,"всего − без золота = 20 − 4 = 16",F(17),C["AMBER"],align="c")
save(im,"slide-13.png")

# 15 · финал
im=load("img-06.png"); d=ImageDraw.Draw(im,"RGBA")
panel(im,0.5,4.35,12.3,2.65,25); d=ImageDraw.Draw(im,"RGBA")
text(d,0.9,4.55,11.5,0.6,"Пара для разминки: 2 из 4 подруг (без ролей). Сколькими способами?",F(21,h=True),C["AMBER"])
branchStrip(d,0.9,5.3,[4,3],"×","12 : 2! = 6")
text(d,7.7,5.55,5.0,0.7,"(A) 4   (B) 6   (C) 8   (D) 12   (E) 16",F(18),C["CREAM"])
save(im,"slide-15.png")

print("готово:", sorted(f for f in os.listdir(OUT) if f.startswith("slide-")))
