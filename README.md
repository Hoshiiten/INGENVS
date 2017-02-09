# INGENVS


Copyright (C) 2016  Léauté Ludovic - Savandara BESSE - Alexia SOUVANE - Alexandre PETIT - Julie Hardy - Fatou NDAO
 
 *  This file is part of INGENVS (INteraction GEne Network Visualization Software)
 
 * This program is free software: you can redistribute it and/or modify it
 under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 * This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 RCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 along with mowgli.  If not, see <http://www.gnu.org/licenses/>.


## Requirements (following information is for Linux only): 

- node js (v4.4.0): open a command and write 

sudo apt-get install python-software-properties python g++ make 

sudo add-apt-repository ppa:chris-lea/node.js

sudo apt-get update

sudo apt-get install nodejs

- neo4j (v3.1.1): download neo4j at https://neo4j.com/download/community-edition/, go to neo4j-community-3.1.0 directory and type ./bin/neo4j start. Then go on your favorite browser to url http://localhost:7474 where you have to choose an ID (idNeo4j) and a password (passwordNeo4j). Remember them.
- py2neo: open a command and write (you must have "pip" already installed):

pip install py2neo

- npm: sudo apt-get install npm


## Database filling

Go into Ingenvs directory and write the following command:

bash run.sh idNeo4j passwordNeo4j

(you can then check your graphs database neo4j at http://localhost:7474)

## Run server

Go into Ingenvs directory and write the following commands:

npm install

nodejs server.js idNeo4j passwordNeo4j

## See web page

GO to: http://localhost:3000/

