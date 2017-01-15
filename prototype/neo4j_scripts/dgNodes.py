# -*- coding: utf-8 -*-
"""
Created on Thu Dec 22 13:49:04 2016

@author: ludovic
"""

import py2neo as gp
from py2neo.ogm import *
import sys

#ID = sys.argv[1]
#password = sys.argv[2]

gp.authenticate("localhost:7474",'neo4j','felix')
graph = gp.Graph()

dis = open("../datasets/seeds.csv")
disdict = {}
for line in dis.readlines():
    disease = line.rstrip().rsplit('\t')
    disdict[disease[0]]={}
    disdict[disease[0]]["allgenes"]=[]
    disdict[disease[0]]["seeds"]=disease[1:]
    
fic = open("../datasets/netIds.csv")
for line,dis in zip(fic.readlines(),disdict):
    nodes = line.rstrip().rsplit(' ')
    disdict[dis]["allgenes"] = nodes
    

for dis in disdict.keys():
    for gen in disdict[dis]["allgenes"]:
        tx = graph.begin()
        if gen in disdict[dis]["seeds"]:
            dg = gp.Node("DG",disease = dis, gene = gen, seed = True)
        else:
            dg = gp.Node("DG",disease = dis, gene = gen)
        graph.create(dg)
        m = graph.find_one('Disease','omimId',dis)
        g = graph.find_one('Gene','entrezId',gen)
        m_dg = gp.Relationship(m,'M_TO_DG',dg)
        g_dg = gp.Relationship(dg,'DG_TO_G',g)
        graph.create(m_dg)
        graph.create(g_dg)
        tx.commit()
