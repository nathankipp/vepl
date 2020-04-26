# Virtual EPL
A random season generator based on historical results in the English Premier League

### What it does
 - EPL teams are selected; at least two are required to "play" a season
 - only matches from seasons that included ALL selected teams are used for league "play"
 - "playing" the season means randomly choosing home/away fixtures from the available matches

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

### data tables (AWS)
teams
 - name
 - abbreviation
 - badgeFile?
 - seasons (csv?)

seasons
 - data from wiki
