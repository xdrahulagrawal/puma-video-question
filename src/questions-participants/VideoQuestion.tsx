import React, { useCallback, useEffect, useRef, useState } from 'react'
import { matrixQuestionOption } from './Questioninterface';
import 'video-react/dist/video-react.css';
import { ControlBar, Player, Shortcut } from 'video-react';
import RadioVideoQuestion from './RadioVideoQuestion';
import { Box, Button } from '@mui/material';
import styles from './styles'
import CommentQuestion from './CommentQuestion';



interface videoQuestionProps {
    id: number;
    question: string;
    type: string
    surveyId: number;
    maxAnswers: number;
    languageId?: number | null;
    videoLink?: string,
    videoMandatory?: boolean,
    questions: [
        {
            id: number;
            question: string;
            type: string;
            surveyId: number;
            showTiming: string;
            maxAnswers: number;
            languageId: number | null;
            options: matrixQuestionOption[];
            createdAt: string;
            updatedAt: string;
            isDeleted: boolean;
        }
    ]
}

const VideoQuestion: React.FC<{ question: videoQuestionProps }> = ({ question: videoQuestionProps }) => {
    const playerRef = useRef<any>(null);
    const [position, setPosition] = useState('')
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [right, setRight] = useState('');
    const [left, setLeft] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [count, setCount] = useState(0);
    const [showQuestionTiming, setShowQuestionTiming] = useState('');
    const [playVideo, setPlayVideo] = useState(false);
    const [mandatory, setMandatory] = useState(false);
    const [videoDuration, setVideoDuration] = useState(null);
    const useEffectExecutions = useRef(0);
    const [noOfQuestion, setNoOfQuestion] = useState<any>([])


    const getPositionTop = (position: string) => {
        if (position === 'top') {
            return '0%';
        } else if (position === 'bottom') {
            return '85%';
        } else if (position === 'left') {
            return '0%';
        } else if (position === 'right') {
            return '9%';
        }
    };

    useEffect(() => {
        if (position === 'top' || position === 'bottom') {
            setHeight('14rem');
            setWidth('99.8%');
            setRight('0');
            setLeft('0');
        } else if (position === 'right') {
            setHeight('10rem');
            setWidth('30%');
            setRight('0');
            setLeft('');
        } else if (position === 'left') {
            setHeight('100%');
            setWidth('30%');
            setRight('');
            setLeft('0');
        }
    }, [position]);

    const renderQuestion = (question: any) => {
        switch (question?.type) {
            case 'radio':
                return <RadioVideoQuestion question={question} />;
            case 'comment':
                return <CommentQuestion question={question} />;
            default:
                return null;
        }
    };

    const handleTimeUpdate = (e: any) => {
        const currentTime = e.target.currentTime;
        setCurrentTime(currentTime);
    };



    useEffect(() => {
        const videoElement = document.getElementsByClassName('video-react-video')[0];
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);


    useEffect(() => {
        const videoElement = playerRef.current.video.video;
        videoElement.addEventListener('loadedmetadata', handleVideoLoaded);
        return () => {
            videoElement.removeEventListener('loadedmetadata', handleVideoLoaded);
        };
    }, []);

    const handleVideoLoaded = () => {
        const videoElement = playerRef.current.video.video;
        const duration = videoElement.duration;
        setVideoDuration(duration);
    };

    const showQuestion = useCallback(() => {
        const player = playerRef.current?.video?.video;
        if (videoQuestionProps?.videoMandatory) {
            return videoQuestionProps?.questions?.map((question: any, index: number) => {
                if (index === count) {
                    if (question?.position !== position || question?.showTiming !== showQuestionTiming) {
                        setPosition(question?.position);
                        setShowQuestionTiming(question?.showTiming);
                        setMandatory(question?.mandatory)
                    }
                    if (currentTime >= question?.showTiming) {
                        player.pause();
                        return (
                            <Box key={index}>
                                {renderQuestion(question)}
                            </Box>
                        );
                    } else if (playVideo) {
                        player.play();
                    }
                }
                return null;
            });
        } else {
            return videoQuestionProps?.questions?.map((question: any, index: number) => {
                if (index === count) {
                    if (question?.position !== position || question?.showTiming !== showQuestionTiming) {
                        setPosition(question?.position);
                        setShowQuestionTiming(question?.showTiming);
                        setMandatory(question?.mandatory)
                        setNoOfQuestion(videoQuestionProps?.questions)
                    }
                    if (currentTime >= question?.showTiming) {
                        return (
                            <Box key={index}>
                                {renderQuestion(question)}
                            </Box>
                        );
                    }
                }
                return null;
            });
        }
    }, [position, currentTime, showQuestionTiming, count]);

    useEffect(() => {
        if (count < videoQuestionProps?.questions?.length && !videoQuestionProps?.videoMandatory && currentTime > Number(showQuestionTiming)) {
            if (count < 1 && currentTime > +videoQuestionProps?.questions?.[1]?.showTiming) {
                if (useEffectExecutions.current < 2) {
                    useEffectExecutions.current += 1;
                    setTimeout(() => {
                        const timer = setTimeout(() => {
                            setCount(count + 1)
                        }, 0);
                        return () => clearTimeout(timer);
                    }, Number(showQuestionTiming) * 1000)
                }
            }
        }

    }, [currentTime]);


    useEffect(() => {
        if (playerRef?.current) {
            playerRef.current.actions.toggleFullscreen = () => {
                console.log("prevent full screen video");
            };
        }
    }, []);


    return (
        <>
            <Box className="custom-video-player" sx={styles?.customPlayer} >
                <Player ref={playerRef} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay  >
                    <ControlBar disableCompletely disableDefaultControls />
                    <Shortcut clickable={false} />
                </Player>
                {(currentTime >= Number(showQuestionTiming) && videoQuestionProps?.questions?.length - 1 >= count) && <Box style={{
                    position: 'absolute', right: '10rem', top: '1rem', display: 'flex', gap: '1rem'
                }}>
                    <Button style={{ cursor: 'pointer', color: 'red', zIndex: '9999', border: '1px solid white' }} onClick={() => { setCount(count + 1); setPlayVideo(true) }}>Submit</Button>
                </Box>}
                {(currentTime >= Number(showQuestionTiming) && videoQuestionProps?.questions?.length - 1 >= count) &&
                    <>
                        <Box
                            className="video-overlay"
                            style={{
                                position: 'absolute', left: left, right: right, width: width,
                                height: height, top: getPositionTop(position), bottom: getPositionTop(position), background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '1px',
                            }}>
                            {showQuestion()}
                        </Box>
                    </>
                }
            </Box>
        </>
    );
}

export default VideoQuestion;
