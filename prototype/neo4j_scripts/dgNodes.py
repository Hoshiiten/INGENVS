# -*- coding: utf-8 -*-
"""
Created on Thu Dec 22 13:49:04 2016

@author: ludovic
"""

import py2neo as gp
from py2neo.ogm import *

gp.authenticate("localhost:7474","neo4j","felix")
graph = gp.Graph()

dis = open("maladies.csv")
disdict = {}
for line in dis.readlines():
    disease = line.rstrip().rsplit(',')
    disdict[disease[0]]=[]
    
fic = open("netIds.csv")
for line,dis in zip(fic.readlines(),disdict):
    nodes = line.rstrip().rsplit(' ')
    disdict[dis] = nodes
    


for disease in disdict.keys():
    for gene in disdict[disease]:
        tx = graph.begin()
        dg = gp.Node("DtoG",dis = disease, gen = gene)
        graph.create(dg)
        m = graph.find_one('Disease','omimId',disease)
        g = graph.find_one('Gene','entrezId',gene)
        m_dg = gp.Relationship(m,'LINKED',dg)
        g_dg = gp.Relationship(dg,'LINKED',g)
        graph.create(m_dg)
        graph.create(g_dg)
        tx.commit()
