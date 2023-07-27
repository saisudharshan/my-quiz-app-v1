import {
  Card,
  Radio,
  Button,
  RadioChangeEvent,
  Typography,
  Alert,
  notification,
  Space,
  Row,
  Col,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const {Paragraph} = Typography
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timer, setTimer] = useState<number>(30);

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
              return 30;
            } else {
              setResult(true);
              return 0;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [currentQuestion]);

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
      openNotificationWithIcon("warning")
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
   setTimer(30); 
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
        description: "Time is up we moved to next question",
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
            <Paragraph >{currentQuestion.question}</Paragraph>
            <Radio.Group onChange={handleAnswerSelect} value={selectedAnswer} style={{width: "100%"}}>
            
              {currentQuestion.choices.map((option, i) => (
               i % 2 === 0 && <Row gutter={[8, 8]} style={{marginBottom: 8}}>
                  <Col span={12}>
                <Radio key={currentQuestion.choices[(i+1) -1]} value={currentQuestion.choices[(i+1) -1]}>
                  {currentQuestion.choices[(i+1) -1]}
                </Radio>
                </Col>
                 <Col span={12}>
                <Radio key={currentQuestion.choices[(i) +1]} value={currentQuestion.choices[(i) +1]}>
                  {currentQuestion.choices[(i) +1]}
                </Radio>
                </Col>
                </Row>
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
