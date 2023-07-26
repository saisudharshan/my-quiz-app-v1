import {
  Card,
  Radio,
  Button,
  RadioChangeEvent,
  Typography,
  Alert,
  notification,
} from "antd";
import result from "antd/es/result";
import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../../Adapter/FetchQuestions";
import { Question } from "../../App";
import QuizResult from "./QuizResult";
const { Title } = Typography;
interface LayoutProps {
  questions: Question[];
  currentQuestion: Question | null;
  setCurrentQuestion: (e: Question) => void;
}
const QuizCard = (props: LayoutProps) => {
  const { questions, currentQuestion, setCurrentQuestion } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timer, setTimer] = useState<number>(30); // 60 seconds (1 minute)

  useEffect(() => {
    let timerId: any;
    if (!result) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            if (currentQuestionIndex !== questions.length - 1) {
              handleNextQuestion(false);
              return 30; // Reset timer to 60 seconds for the next question
            } else {
              setResult(true);
              return 0;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerId); // Clean up the timer on component unmount
  }, [currentQuestionIndex]);

  useEffect(() => {
    {
      timer === 10 && openNotificationWithIcon("info");
    }
  }, [timer]);
  const handleAnswerSelect = (e: RadioChangeEvent) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = (click: boolean) => {
    if (!click && selectedAnswer === null) {
      openNotificationWithIcon("warning");
    }
    if (
      currentQuestion &&
      selectedAnswer === currentQuestion.choices[currentQuestion.answer_index]
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCurrentQuestion(questions[currentQuestionIndex + 1]);
    setTimer(30); // Reset timer to 60 seconds for the next question
  };
  const [api, contextHolder] = notification.useNotification();
  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType) => {
    if (type === "info") {
      api.info({
        message: "hint",
        description: currentQuestion?.hint,
      });
    }
    if (type === "warning") {
      api.warning({
        message: "TimeOut",
        description: "time is up we moved to next question",
      });
    }
  };

  return (
    <>
      {" "}
      {!result && currentQuestion && (
        <>
          {contextHolder}{" "}
          <Card
            title={`Question ${currentQuestionIndex + 1}`}
            className="quiz-card"
          >
            <p>{currentQuestion.question}</p>
            <Radio.Group onChange={handleAnswerSelect} value={selectedAnswer}>
              {currentQuestion.choices.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
          {timer <= 20 && (
            <div className="timer">
              <Title level={4}>Time Remaining: {timer} seconds</Title>
            </div>
          )}
        </>
      )}
      {!result &&
        (currentQuestionIndex < questions.length - 1 ? (
          <Button type="primary" onClick={() => handleNextQuestion(true)}>
            Next Question
          </Button>
        ) : (
          <Button type="primary" onClick={() => setResult(true)}>
            Finish
          </Button>
        ))}
      {result && <QuizResult score={score} />}{" "}
    </>
  );
};
export default QuizCard;
