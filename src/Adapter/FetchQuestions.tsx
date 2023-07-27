import axios from 'axios';
export  const fetchQuestions = (count: number) => {

    return axios.get('/data.json').then((res) => {
      
      return res.data.questions.sort(() => Math.random() - 0.5).slice(0, count)
    })
}