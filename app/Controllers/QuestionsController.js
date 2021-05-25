import { ProxyState } from "../AppState.js"
import { triviasService } from "../Services/TriviasService.js"


function _drawQuestions() {
  let template = `<b class="sticky-top mx-3">Score: ${ProxyState.correctAnswers}/10</b>`
  ProxyState.questions.forEach(q => template += q.template)
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