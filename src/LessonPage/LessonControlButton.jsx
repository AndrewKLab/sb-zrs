import React from 'react'
import { Button } from '../_components';

export const LessonControlButton = ({ user, course_id, lessons, finishedLessonsLenght, lesson_id, status, number, lesson_passed_id, finish_time }) => {
    if (status === "finished") {
        if (number === lessons.length && finishedLessonsLenght !== lessons.length) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onPress={() => { }}>
                    Предыдущий непройденый урок
                </Button>
            )
        } else if (finishedLessonsLenght === lessons.length) {
            if (course_status === "inprocess") {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onPress={() => { }}>
                        Завершить курс
                    </Button>
                )
            } else {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onPress={() => { }}>
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


