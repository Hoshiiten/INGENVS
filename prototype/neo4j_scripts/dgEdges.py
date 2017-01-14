# -*- coding: utf-8 -*-
import py2neo as gp
from py2neo.ogm import *
from pandas import DataFrame
import sys

#ID = sys.argv[1]
#password = sys.argv[2]

gp.authenticate("localhost:7474",'neo4j','felix')
graph = gp.Graph()


    
def readPpiNetwork(filename):
    dico = {}
    fic = open(filename)
    for line in fic.readlines():
        rel = line.rstrip().rsplit(' ')
        dico[rel[0]]={}
        dico[rel[0]][rel[1]]=float(rel[2])
    return dico

relationdict = readPpiNetwork("../datasets/simNet2.csv")

dis = '002'

selector = gp.NodeSelector(graph)
for dg in relationdict:
    tx = graph.begin()
    startN = selector.select("DG", disease=dis,gene=dg).first()
    for relative in relationdict[dg]:
        endN = selector.select("DG", disease=dis,gene=relative).first()
        if len(list(graph.match(start_node=startN, end_node=endN, rel_type='INTERACT_WITH', bidirectional=True))) == 0:
            rel = gp.Relationship(startN,'INTERACT_WITH',endN,value=relationdict[dg][relative])
            graph.create(rel)
    tx.commit()
    
   

