import { ProxyState } from "../AppState.js"
import { Question } from "../Models/Question.js"

class TriviasService {
  async getTriviaQuestions() {
    let res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    let data = await res.json()
    console.log(data)

    ProxyState.questions = data.results.map(q => new Question(q))
    ProxyState.correctAnswers = 0
  }

  selectAnswer(selected, answer, id) {
    if (selected == answer) {
      ProxyState.correctAnswers++
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'That is correct!'
      })
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: `Wrong answer, dummy \n correct answer: ${answer}`
      })
    }
    ProxyState.questions = ProxyState.questions.filter(q => q.color != id)
  }
}

export const triviasService = new TriviasService()