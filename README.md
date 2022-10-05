#  Recreational Team Manager
## <a href="https://rec-team-manager.fly.dev/">Link to App!</a>

## About this project
The goal of this project was to make organizing a recreatational team easier through automation and data aggregation.  As a team captain for an adult coed soccer team for over three years, I know first hand how hard it is to make sure each game is successful and enjoyable for players.  Making sure you have enough subs, alerting players of changes to the schedule, and managing league payments can weigh down what should be a fun hobby. What if there was an app that could handle most of that grunt work for you?

## Planning Materials
<a href="https://trello.com/b/KBWrKxLY/main-board">Link to Trello Board</a>
### ERD
[Updated Link to new ERD]

## Code Snippet
```javascript
function deleteGame(req,res){
  Game.findById(req.params.id)
  .then(game =>{
    Team.updateMany({_id: {$in:[game.homeTeam,game.awayTeam]}},{$pull: {games:game._id}})
    .then(()=>{
      game.delete()
      res.redirect('/games')
    })
  })
}
```
The reason this code snippet makes me feel so proud is because ".updateMany" function.  I was not previously exposed to this Mongoose method and could not think of an elegant workaround with my previously known methods.  After giving a detailed explaination of my problem to the search engine, I was able to find that ".updateMan" would be perfect for my use case.  After reading the Mongoose docs and external articles, I was able to figure out how the method works and form it perfectly to my use case.  


## Technologies Used
[![Generic badge](https://img.shields.io/badge/Made%20with-MongoDB-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Made%20with-Express-pink.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Made%20with-Node.js-black.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Made%20with-Mongoose-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Made%20with-Bootstrap-blue.svg)](https://shields.io/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Generic badge](https://img.shields.io/badge/Made%20with-CSS-red.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Made%20-HTML-yellow.svg)](https://shields.io/)

<br>

## External Resources Used:
<a href="https://getbootstrap.com/">Bootstrap</a>

<a target="_blank" href="https://icons8.com/icon/J53V3a4rzlOi/soccer-ball">Soccer Ball</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

<a target="_blank" href="https://icons8.com/icon/11642/notification">Notification</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

<a target="_blank" href="https://icons8.com/icon/3DXpsdYTg7AE/notification-bell">Notification Bell</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

## Next Steps
Connect to external APIs to send out emails and SMS messages to players