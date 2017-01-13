# -*- coding: utf-8 -*-
import py2neo as gp
from py2neo.ogm import *
import sys

ID = sys.argv[1]
password = sys.argv[2]

gp.authenticate("localhost:7474",ID,password)
graph = gp.Graph()

class Disease(GraphObject):
    __primarykey__ = 'omimId'
    
    omimId= Property()
    name = Property()    
    tissu = Property() 
    
fic = open("./prototype/datasets/maladies.csv")
diseaseNodes = {}
for line in fic.readlines():
    disease = line.rstrip().rsplit(',')
    diseaseNodes[disease[0]]={"name":disease[1],"tissu":disease[2]}

for disease in diseaseNodes.keys():
    tx = graph.begin()
    dis = Disease()
    dis.omimId= disease
    dis.name = diseaseNodes[disease]['name']
    dis.tissu = diseaseNodes[disease]['tissu']    
    graph.create(dis)
    tx.commit()


