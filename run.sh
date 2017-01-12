#!/bin/bash

python prototype/neo4j_scripts/diseaseNodes.py $1 $2
python prototype/neo4j_scripts/diseaseEdges.py $1 $2
python prototype/neo4j_scripts/geneNodes.py $1 $2
python prototype/neo4j_scripts/dgNodes.py $1 $2
