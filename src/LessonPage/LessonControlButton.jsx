import React from 'react'
import { Button } from '../_components';

export const LessonControlButton = ({course_status, lessons, finishedLessonsLenght, status, number }) => {
    if (status === "finished") {
        if (Number(number) === lessons.length && Number(finishedLessonsLenght) !== lessons.length) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    type="submit">
                    Предыдущий непройденый урок
                </Button>
            )
        } else if (finishedLessonsLenght === lessons.length) {
            if (course_status === "inprocess") {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">
                        Завершить курс
                    </Button>
                )
            } else {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">
                        Назад к курсу
                    </Button>
                )
            }
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    type="submit">
                    Следующий урок
                </Button>
            )
        }
    } else {
        return (
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Пройти урок
            </Button>
        )
    }
}


