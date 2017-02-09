#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]
then
        echo "Must be: bash run.sh [ idneo4j ] [ passwordNeo4j ]"
	exit 1
fi

python prototype/neo4j_scripts/diseaseNodes.py $1 $2
python prototype/neo4j_scripts/diseaseEdges.py $1 $2
python prototype/neo4j_scripts/geneNodes.py $1 $2
python prototype/neo4j_scripts/dgNodes.py $1 $2
python prototype/neo4j_scripts/dgEdges.py $1 $2

