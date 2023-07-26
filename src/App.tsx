import React, { useState, useEffect } from 'react';
import { Layout, Card, Radio, Button, Typography, Result, RadioChangeEvent } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import QuizResult from './Quiz/Components/QuizResult';
import { fetchQuestions } from './Adapter/FetchQuestions';
import StartCard from './Quiz/Components/StartCard';
import ContentSection from './Quiz/ContentSection';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
export interface Question {
  question_id: number
  question: string
  answer_index: number
  choices: string[]
  hint: string
}


const App = () => {

  return (
    <Layout>
      <Header className="header">
        <Title level={2}>Quiz App</Title>
      </Header>
      <ContentSection/>
      <Footer className="footer">Quiz App ©2023 Created by You</Footer>
    </Layout>
  );
};

export default App;
