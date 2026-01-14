- Get method for getting unique 15 questions

get - http://localhost:3000/question/start

- submit the request and get thee results

post - http://localhost:3000/quiz/submit

body

```
{
  "answers": [
    { "questionId": 1, "selectedOption": "A" },
    { "questionId": 3, "selectedOption": "A" },
    { "questionId": 36, "selectedOption": "A" },
    { "questionId": 21, "selectedOption": "B" }
  ]
}
```
