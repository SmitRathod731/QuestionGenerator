const express = require('express');
const cors = require('cors');
const app = express();
const data = require("./data.json");
app.use(express.json());
app.use(cors());

const difficulty = ["Easy", "Medium", "Hard"];
app.get('/questions', (req, res) => {
    console.log(req.query);
    const { totalMarks, easy, medium, hard } = req.query;
    const parsedTotalMarks = parseInt(totalMarks);
    const parsedEasy = parseFloat(easy) / 100;
    const parsedMedium = parseFloat(medium) / 100;
    const parsedHard = parseFloat(hard) / 100;

    let cntEasy = Math.floor(parsedTotalMarks * parsedEasy);
    let cntMedium = Math.floor(parsedTotalMarks * parsedMedium / 2);
    let cntHard = Math.floor(parsedTotalMarks * parsedHard / 5);
    let remMarks = parsedTotalMarks - (cntEasy + cntMedium * 2 + cntHard * 5);

    var questionsList = [];
    difficulty.forEach((level) => {
        const availableQuestion = data.filter(x => x.difficulty === level);
        if (level === "Easy") {
            while (cntEasy > 0 && availableQuestion.length > 0) {

                var selectedQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
                const isQuestionPresent = questionsList.some(
                    (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
                );

                if (!isQuestionPresent) {
                    questionsList.push(selectedQuestion);
                    cntEasy -= 1;
                }
            }
        }
        else if (level === "Medium") {
            while (cntMedium > 0 && availableQuestion.length > 0) {

                var selectedQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
                const isQuestionPresent = questionsList.some(
                    (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
                );

                if (!isQuestionPresent) {
                    questionsList.push(selectedQuestion);
                    cntMedium -= 1;
                }
            }

        } else if (level === "Hard") {
            while (cntHard > 0 && availableQuestion.length > 0) {

                var selectedQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
                const isQuestionPresent = questionsList.some(
                    (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
                );

                if (!isQuestionPresent) {
                    questionsList.push(selectedQuestion);
                    cntHard -= 1;
                }
            }

        }

    });
    if (remMarks > 0) {
        while (remMarks > 0) {
            const selectedQuestion =
                data[Math.floor(Math.random() * data.length)];
            if (remMarks >= selectedQuestion.marks) {
                const isQuestionPresent = questionsList.some(
                    (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
                );
                if (!isQuestionPresent) {
                    questionsList.push(selectedQuestion);
                    remMarks -= selectedQuestion.marks;
                }
            }
        }
    }
    console.log(questionsList);
    return res.send({ status: 200, questionList: questionsList });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
