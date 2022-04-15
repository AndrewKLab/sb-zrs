import React from 'react'
import { Button } from '../_components';

export const LessonControlButton = ({ course, lesson, finished_lessons_lenght, update_passed_lesson_loading, update_passed_course_loading }) => {
    if (lesson.status === "finished") {
        if (Number(lesson.number) === course.lessons.length && Number(finished_lessons_lenght) !== course.lessons.length) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    type="submit">
                    Предыдущий непройденый урок
                </Button>
            )
        } else if (finished_lessons_lenght === course.lessons.length) {
            if (course.passed_course_status === "inprocess") {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={update_passed_course_loading}
                        loading={update_passed_course_loading}
                    >
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
                disabled={update_passed_lesson_loading}
                loading={update_passed_lesson_loading}
            >
                Пройти урок
            </Button>
        )
    }
}


