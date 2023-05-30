import React, { useState, useCallback, createContext } from 'react';
import { AppBar, Box, Button } from '@mui/material';
import { ques } from './QuestionJson';
import CommentQuestion from './CommentQuestion';
import VideoQuestion from './VideoQuestion';




export const QuestionAnswerContext = createContext<any>(null);

const Header = () => {
  
    const [selectRadioOption, setSelectRadioOption] = useState("");

    const [questions, setQuestions] = useState([ques]);
    const [switchQuestion, setSwitchQuestion] = useState(0)
    const questionSurvey = questions[0]?.data?.surveyQuestions
    const [description, setDescription] = useState("");


    const renderQuestion = (question: any) => {
        switch (question?.type) {
            case 'comment':
                return <CommentQuestion question={question} />;
            case 'video':
                return <VideoQuestion question={question} />;
            default:
                return null;
        }
    };


    const showQuestion = useCallback(() => {
        return questionSurvey.map((question, index) => {
            if (index === switchQuestion) {
                return <div key={index}>
                    {renderQuestion(question)}
                </div>
            }
            return null;
        });
    }, [switchQuestion])

    return (
        <>
            <Box sx={{ height: '100vh' }}>
                <Box sx={{ backgroundColor: switchQuestion === 9 ? 'white' : '#D8BFD8', height: '100%' }}>
                    <QuestionAnswerContext.Provider value={{
                        selectRadioOption,
                        description, 
                        setDescription,
                        setSelectRadioOption,
                    }}>
                        {showQuestion()}
                    </QuestionAnswerContext.Provider>
                </Box>
            </Box>
        </>
    );
}
export default Header;