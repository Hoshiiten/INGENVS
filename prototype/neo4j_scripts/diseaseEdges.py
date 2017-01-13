# -*- coding: utf-8 -*-
import py2neo as gp
from py2neo.ogm import *
import sys

ID = sys.argv[1]
password = sys.argv[2]

gp.authenticate("localhost:7474",ID,password)
graph = gp.Graph()

def readDiseaseIds(filename):
    relationdict = {}
    diseaseIndex = [] 
    fic = open(filename)
    for line in fic.readlines():
        dis = line.rstrip().rsplit(',')
        relationdict[dis[0]]={}
        diseaseIndex.append(dis[0])
    return relationdict, diseaseIndex
    
def readAdjacencyMatrix(filename,indexlist,dico):
    mat = []
    fic2 = open(filename)
    for line in fic2.readlines():
        mat.append([float(i) for i in line.rstrip().rsplit(',')])
    
    for i in range(len(mat)):
        for j in range(len(mat)):
            if bool(mat[i][j]):
                dico[indexlist[i]][indexlist[j]] = mat[i][j] 
            
    return dico

relationdict, diseaseIndex = readDiseaseIds("./prototype/datasets/maladies.csv")
relationdict = readAdjacencyMatrix("./prototype/datasets/maladiesSim.csv",diseaseIndex,relationdict)

for disId in relationdict:    
    tx = graph.begin()
    dis = graph.find_one('Disease','omimId',disId)
    for relative in relationdict[disId]:
        relnode = graph.find_one('Disease','omimId',relative)
        if len(list(graph.match(start_node=dis, end_node=relnode, rel_type='SIMILAR_TO', bidirectional=True))) == 0:
            rel = gp.Relationship(dis,'SIMILAR_TO',relnode,value=relationdict[disId][relative])
            graph.create(rel)
    tx.commit()

