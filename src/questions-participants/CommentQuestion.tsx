import React, { useContext, } from 'react'
import { Box, TextField ,Typography} from '@mui/material';
import { QuestionAnswerContext } from './Header';


interface commentQuestionProps {
    id: number;
    question: string;
    type: string;
    surveyId: number;
    maxNoOfChoices: number | null;
    languageId: number | null;
    options: never[];
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}


const CommentQuestion: React.FC<{ question: commentQuestionProps }> = ({ question: commentQuestionProps }) => {

    const context = useContext(QuestionAnswerContext);
    const { description, setDescription } = context;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        if (inputValue.length <= 1000) {
            setDescription(inputValue);
        }
    };

    return (
        <Box style={{ padding: '20px' }}>
            <Box sx={{ minWidth: 270, mt: '1rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '1.1rem' }} >2) Please enter you email address</Typography>
                    </Box>
                    <TextField
                      sx={{
                        mt: '1rem',
                        border: '1px solid #fff',
                        '& input::placeholder': {
                          color: '#fff',
                        },
                      }}
                        fullWidth
                        multiline
                        minRows={1}
                        placeholder="Enter you emailId..."
                        value={description}
                        onChange={handleChange}
                    />
            </Box>
        </Box>
    )
}

export default CommentQuestion