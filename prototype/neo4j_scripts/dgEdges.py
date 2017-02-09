# -*- coding: utf-8 -*-
import py2neo as gp
from py2neo.ogm import *
from pandas import DataFrame
import sys
import os

ID = sys.argv[1]
password = sys.argv[2]
gp.authenticate("localhost:7474",ID,password)
graph = gp.Graph()

selector = gp.NodeSelector(graph)
    
def readPpiNetwork(filename):
    dico = {}
    fic = open(filename)
    dis = fic.readline().rstrip()
    for line in fic.readlines():
        rel = line.rstrip().rsplit('\t')
        if rel[0] in dico:
                dico[rel[0]][rel[1]]=float(rel[2])
        else:
            dico[rel[0]]={}
            dico[rel[0]][rel[1]]=float(rel[2])
    return dis,dico

   
for fichier in os.listdir("./prototype/datasets/interaction_networks/"):
    dis,relationdict = readPpiNetwork("./prototype/datasets/interaction_networks/"+fichier)

        
    for dg in relationdict:
        tx = graph.begin()
        startN = selector.select("DG", disease=dis, gene=dg).first()
        print dg
        print dis
        print startN
        for relative in relationdict[dg]:
            endN = selector.select("DG", disease=dis, gene=relative).first()
            print endN
            if len(list(graph.match(start_node=startN, end_node=endN, rel_type='INTERACT_WITH', bidirectional=True))) == 0:
                rel = gp.Relationship(startN,'INTERACT_WITH',endN,value=relationdict[dg][relative])
                graph.create(rel)
        tx.commit()
    
   

