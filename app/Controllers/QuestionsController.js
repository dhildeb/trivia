import { ProxyState } from "../AppState.js"
import { triviasService } from "../Services/TriviasService.js"


function _drawQuestions() {
  let template = `<h1 class="mx-3 font-weight-bold" style="-webkit-text-stroke: 1px white; color:#3c50d2;text-shadow: -5px 2px 10px #162ec9;">Score: ${ProxyState.correctAnswers}/10</h1>`
  // display all questions
  // ProxyState.questions.forEach(q => template += q.template)
  if (ProxyState.questions[0] != undefined) {
    template += ProxyState.questions[0]?.template
  } else if (ProxyState.correctAnswers > 4) {
    template += `<img src="https://thumbs.gfycat.com/SoupyRelievedBufflehead-small.gif">`
  } else if (ProxyState.correctAnswers > 0) {
    template += `<img src="http://roarlocal.com.au/wp-content/uploads/2013/06/why-are-you-so-dumb-300x195.jpg">`
  }
  document.getElementById('app').innerHTML = template
}


export class QuestionsController {
  constructor(
  ) {
    ProxyState.on('questions', _drawQuestions)
    ProxyState.on('correctAnswers', _drawQuestions)
    _drawQuestions()
  }

  startTrivia() {
    triviasService.getTriviaQuestions()
  }

  selectAnswer(selected, answer, id) {
    triviasService.selectAnswer(selected, answer, id)
  }
}