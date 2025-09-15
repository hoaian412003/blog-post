import React, { useCallback, useMemo } from 'react';
type Props = {
    content: string;
    answers: string[];
    correctAnswers: number | number[];
    type: 'multiple' | 'single';
    explanation?: string;
    level: string;
}

export default function QuestionQuizz(props: Props) {

    const [selectedAnswers, setSelectedAnswers] = React.useState<Set<number>>(new Set());
    const [submitted, setSubmitted] = React.useState(false);

    const handleAnswerChange = (index: number) => {
        if (selectedAnswers.has(index)) {
            const newSelectedAnswers = new Set(selectedAnswers);
            newSelectedAnswers.delete(index);
            setSelectedAnswers(newSelectedAnswers);
        } else {
            const newSelectedAnswers = new Set(selectedAnswers);
            newSelectedAnswers.add(index);
            setSelectedAnswers(newSelectedAnswers);
        }
    }

    const isCorrect = useMemo(() => {
        if(!submitted) return undefined;
        // check if all selected answers are correct
        if (props.type === 'single') {
            return selectedAnswers.has(props.correctAnswers as number);
        } else {
            const correctAnswersSet = new Set(props.correctAnswers as number[]);
            if (selectedAnswers.size !== correctAnswersSet.size) return false;
            for (let answer of selectedAnswers) {
                if (!correctAnswersSet.has(answer)) return false;
            }
            return true;
        }
    }, [selectedAnswers, submitted])

    const isCorrectAnswer = useCallback((index: number) => {
        if (props.type === 'single') {
            return index === props.correctAnswers;
        } else {
            return (props.correctAnswers as number[]).includes(index);
        }
    }, [props.correctAnswers, props.type]);

    return <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '24px',
        backgroundColor: isCorrect === undefined ? '#eee' : isCorrect ? '#d4edda' : '#f8d7da',
    }}>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <h5 style={{ fontSize: '18px', maxWidth: '90%' }}>{props.content}
                <span style={{
                    marginLeft: 8,
                    fontStyle: 'italic',
                    fontWeight: 500
                }}>
                 Select {Array.isArray(props.correctAnswers) ? props.correctAnswers.length : 1}
                </span>
                 </h5>
            <div style={{
                backgroundColor: props.level === 'easy' ? '#d1e7dd' : props.level == 'medium' ? '#fff3cd' : '#f8d7da',
                padding: 4,
                borderRadius: 10,
            }}>{props.level}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            {props.answers.map((answer, index) => (
                <label key={index} style={{ display: 'flex',
                 alignItems: 'center',
                 gap: '8px',
                 textDecoration: submitted && !isCorrectAnswer(index) && selectedAnswers.has(index) ? 'line-through' : 'none',
                }}>
                    <input
                        type={props.type === 'multiple' ? 'checkbox' : 'radio'} name="quiz" value={index}
                        onChange={() => handleAnswerChange(index)}
                    />
                    {answer}
                </label>
            ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p style={{
                fontSize: '16px',
                fontStyle: 'italic',
                color: "Highlight",
                display: submitted ? 'block' : 'none',
            }}>
                {props.explanation}
            </p>
            <button
             style={{
                backgroundColor: 'black',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '8px',
            }}
            onClick={() => setSubmitted(!submitted)}
            >
                {submitted ? 'Reset' : 'Submit'}
            </button>
        </div>
    </div>
}