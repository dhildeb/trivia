
export class Question {
  constructor(data) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16)

    this.category = data.category
    this.question = data.question
    this.answer = data.correct_answer
    this.answerOptions = [...data.incorrect_answers, data.correct_answer]
    this.color = randomColor
  }

  get template() {
    let randomize = this.answerOptions.map((a) => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map((a) => a.value)
    return `
    <div class="card p-5" style="color:#${this.color};">
    <h3>Category: ${this.category}</h3>
    <h2>${this.question}</h2>
    <button class="btn btn-info m-1" onclick="app.questionsController.selectAnswer('${randomize[0]}', '${this.answer}','${this.color}')">${randomize[0]}</button>
    <button class="btn btn-info m-1" onclick="app.questionsController.selectAnswer('${randomize[1]}', '${this.answer}','${this.color}')">${randomize[1]}</button>
    ${randomize[2] ? `<button class="btn btn-info m-1" onclick="app.questionsController.selectAnswer('${randomize[2]}', '${this.answer}','${this.color}')">${randomize[2]}</button>` : ''}
    ${randomize[3] ? `<button class="btn btn-info m-1" onclick="app.questionsController.selectAnswer('${randomize[3]}', '${this.answer}','${this.color}')">${randomize[3]}</button>` : ''}
    </div>
    `
  }
}
