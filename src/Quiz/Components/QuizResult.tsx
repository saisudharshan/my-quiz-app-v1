import { Result } from "antd"

interface LayoutProps {
    score: number
}
const QuizResult = (props: LayoutProps) => {
    return <Result
    status="success"
    title="Successfully You Completed the Quiz!"
    subTitle={`Your Score is ${props.score}`}
  />
}
export default QuizResult;