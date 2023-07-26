import axios from 'axios';
export  const fetchQuestions = () => {

    return axios.get('/data.json').then((res) => {
        console.log(res)
      return res.data.questions
    })
}