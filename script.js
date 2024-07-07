const clog                  = console.log
const cerr                  = console.error
const select                = (selector) => document.querySelector(selector)
const selectAll             = (selector) => document.querySelectorAll(selector)
const ERROR_MESSAGE_TIMEOUT = 3000


function spawnTemplate(template_selector, wrapperElement="div", className="", parent=document.body) {
  const templateFragment  = document.importNode(select(template_selector).content, true) // the true is SOOOO important!
  const wrapper           = document.createElement(wrapperElement)
  wrapper.className       = className
  wrapper.appendChild(templateFragment)
  wrapper.addEventListener

  parent.appendChild(wrapper)
  
  return wrapper
}

function spawnError(title='[error title]', description='[error description]') {
  const errorDiv = spawnTemplate('#template_error_message', 'div', 'error_message');
  errorDiv.querySelector('.title')      .innerText = title
  errorDiv.querySelector('.description').innerText = description

  setTimeout(() => {
    errorDiv.remove()
  }, ERROR_MESSAGE_TIMEOUT);
}



(function() {
  const squares     = selectAll('.square')
  const choices     = [0,1,2,3,4,5,6,7,8]
  let [p1, p2]      = ['X', 'O']
  let currentPlayer = p1

  function swapPlayer() {
    if (currentPlayer == p1) {
      currentPlayer = p2
    }
    else {
      currentPlayer = p1
    }
  }

  function checkChoices() {
    const winning_states = [
      [0, 4, 8], [2, 4, 6],
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ]

    for (let state of winning_states) {
      let win = choices[state[0]] === choices[state[1]] && choices[state[1]] === choices[state[2]]
      let winner = null

      if (win) {
        if (choices[state[0]] === p1) { winner = p1 }
        else                          { winner = p2 }

        spawnError('winner!', `${winner}  won the game!`)
        return true
      }
    }
    return false
  }

  function render() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerText = choices[i]
      squares[i].addEventListener('click', e => {
        squares[i].innerText = `[${currentPlayer}]`
        choices[i]           =     currentPlayer
  
        if(checkChoices()) {
          clog(`end of game.`); return
        }
        swapPlayer()
      })
    }
  }
  return render
})()()


// this is the ES6 class - based solution (same logic, same everything)
class Game {
  static squares       = selectAll('.square')
  static choices       = [0,1,2,3,4,5,6,7,8]
  static p1            = 'X'
  static p2            = 'O'
  static currentPlayer = Game.p1

  static swapPlayer() {
    if (Game.currentPlayer == Game.p1) {
      Game.currentPlayer = Game.p2
    }
    else {
      Game.currentPlayer = Game.p1
    }
  }

  static checkChoices() {
    const winning_states = [
      [0, 4, 8], [2, 4, 6],
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ]

    for (let state of winning_states) {
      let win = Game.choices[state[0]] === Game.choices[state[1]] && Game.choices[state[1]] === Game.choices[state[2]]
      let winner = null

      if (win) {
        if (Game.choices[state[0]] === Game.p1) { winner = Game.p1 }
        else                                    { winner = Game.p2 }

        spawnError('winner!', `${winner}  won the game!`)
        return true
      }
    }

    return false
  }

  static render() {
    for (let i = 0; i < Game.squares.length; i++) {
      Game.squares[i].innerText = Game.choices[i]
      Game.squares[i].addEventListener('click', e => {
        Game.squares[i].innerText = `[${Game.currentPlayer}]`
        Game.choices[i]           =     Game.currentPlayer
        if(Game.checkChoices()) { clog(`end of game.`); return }
        Game.swapPlayer()
      })
    }
  }

}

// Game.render()