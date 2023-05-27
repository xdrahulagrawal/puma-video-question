import React, { useContext, useState } from 'react'
import { Box, Card, CardContent, Radio, RadioGroup, FormControl, FormControlLabel, Typography } from '@mui/material';
import { QuestionAnswerContext } from './Header';



interface radioQuestionProps {
    id?: number;
    question: string;
    type: string;
    surveyId: number;
    maxNoOfChoices?: number;
    languageId?: number | null;
    options?: [{
        id: number;
        label: string;
        description: string | null;
        surveyQuestionId: number;
        languageId: number | null;
        imageUrl: string | null;
        index: number;
        createdAt: string;
        updatedAt: string;
        isDeleted: boolean;
    }];
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
}

const RadioVideoQuestion: React.FC<{ question: radioQuestionProps }> = ({ question: radioQuestionProps }) => {

    const context = useContext(QuestionAnswerContext);
    const { selectRadioOption, setSelectRadioOption } = context || []

    return (
        <Box style={{ padding: '34px' }}>
            <Box sx={{ minWidth: 270, mt: '2rem' }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 15, color: '#fff' }} color="text.secondary">
                            <b>{` ${radioQuestionProps?.question}`}</b>
                        </Typography>
                    </Box>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            sx={{ mt: '1rem', color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
                            value={selectRadioOption}
                            onChange={(e) => setSelectRadioOption(e.target.value)}
                        >
                            {radioQuestionProps?.options?.map((opt) => (
                                <FormControlLabel key={opt?.id} value={opt?.label} control={<Radio />} label={opt.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RadioVideoQuestion
