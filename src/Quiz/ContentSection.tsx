import { Button, Card, Radio, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import result from "antd/es/result";
import Title from "antd/es/skeleton/Title";
import { useEffect, useState } from "react";
import { fetchQuestions } from "../Adapter/FetchQuestions";
import { Question } from "../App";
import QuizCard from "./Components/QuizCard";
import QuizResult from "./Components/QuizResult";
import StartCard from "./Components/StartCard";

const ContentSection = () => {
    const [start, setStart] = useState(false);
    const [value, setValue] = useState(5);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
        const fetchApi = async() => {
          const data: Question[] = await fetchQuestions();
          console.log(data, "data");
          setQuestions(data);
          setCurrentQuestion(data[0]);
          setStart(true);
        }
    return <>
       <Content className="content">
        { !start ? <>
        <StartCard value={value} setValue={setValue} />
        <Button  onClick={() => {fetchApi()}}> Start</Button>
        </> : <QuizCard questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
}
      </Content>
    </>
}
export default ContentSection;