# Virtual EPL
A random results generator based on real matches from the English Premier League.

---

### What it does
1. Choose some EPL teams; at least two are required to play.
2. Fixtures from seasons where _all_ selected teams played are used to pick results.
3. When you play, results are randomly chosen (honoring home/away fixtures) from the eligible seasons.
4. Match results (w/ year) are listed, along with a virtual league table.

---

### Start here; do more
1. ```$ git clone [this-repo] [your-dir]```; ```$ cd [your-dir]```
2. ```$ nvm use``` (node v13.12.0)   
3. ```yarn```
4. ```yarn start``` (runs create-react-app on localhost:3k)  

### Tech stack
 - node 13.12.0 (season data parsing)
 - yarn
 - React (create-react-app)
 - Bulma (css framework)
