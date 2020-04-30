# Virtual EPL
A random season generator based on historical results in the English Premier League

### What it does
 - EPL teams are selected; at least two are required to "play" a season
 - only matches from seasons that included ALL selected teams are used for league "play"
 - "playing" the season means randomly choosing home/away fixtures from the available matches

---

## Get up and running
1. ```$ git clone [this-repo] [your-dir]```; ```$ cd [your-dir]```
2. ```$ nvm use``` (node v13.12.0)   
3. ```yarn```
4. ```yarn start``` (runs create-react-app on localhost:3k)  

## Tech stack
 - react (create-react-app)
 - bulma (a css framework to give us out-of-the-box styling)
 - TBD: state management (mobX, Redux, etc...)
 - unit testing? (jest is default; enzyme for components?)

---

## Rough workstream/TODOS
These are not in any order--pick off whatever you want, @davicho!

##### Components
1. LeagueTable
 - use Bulma table
 - use selected teamm, but add mock data for win, loss, tie, points, GD, GF, GA, etc.
2. Match
 - takes in teams (home, away) and result
 - should show badges (maybe a v b), score (ARS 2 - 1 MCI), and the season it came from
 - can use card or box from Bulma
 - should be slim enough to show as part of a match week compoment (see next)
3. MatchWeek
 - takes in a series of match results and displays them as Match(es)
 - styled to nicely contain the Match components, and have a title for the match week

#### UI
1. A "Play" button to kick off our big-ass computation
 - question: do we first want to generate the match schedule, and THEN let them "play"
1. "clear all" link/button to empty the list of selected teams
 - it can live top-right next to the "select teams" heading maybe?
2. Figure out some better way to show which season(s) will be used to choose results

#### Data & computations
1. Set up a piece of state we can  use to quickly compute matches
 - not sure about the data structure here...
2. ~~Compute match list~~
 - using the selected teams, build a week-by-week schedule of matches
 - everyone plays everyone else (random order), then at opposite venue (same order as prev order)  
   a. Week 1: A v B, C v D  
   b. Week 2: A v C, B v D
   c. Week 3: A v D, B v C  
   d. ...same matches, opposite venue
 - question: do we only allow leagues w/ an even # of teams???
3. Random selection of results (enriches match week data)
 - take in match schedule
 - grab result from available matches
 - return match schedule with results
 - does this also do the league table computations?

#### Down the road...
1. create mobile version/layout for team selection
 - maybe a horizontal scroll w/ just the team badges?
2. Run multiple simulations in a row?

---

## The plan...

### UI
1. a selectable list of every team that's ever played in the EPL
  - seasons played shown for each
  - as teams are selected, the list of available seasons changes
  - teams not in ANY listed season become disabled and cannot be selected
2. a "play" button that becomes active when two teams are selected

### Output
 - the league table (win, draw, loss, goals for, goal against, goal diff)
   TODO: what is tie break?
 - the match by match results with ref to the year/season each came from
 - a "re-play" button?

### data
 - season data from wikipedia munged into json blob
