module.exports = {
    easy: [{
            equation: '1 {target} 2',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '57 {target} 100',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '100 {target} 100',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '150 {target} 150',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '105 {target} 11',
            answerText: 'เท็จ',
            answer: 'false'
        }
    ],
    nomal: [{
            equation: '10 {target} 11',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '11 {target} 20',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(15 + 2) {target} (4 + 8)',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(16 / 2) {target} (4 * 5)',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '(22 % 4 + 5 * 13) {target} 80',
            answerText: 'จริง',
            answer: 'true'
        }
    ],
    hard: [{
            equation: '(7 > 12) {target} (23 > 14)',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(21 < 20) {target} (15 > 10)',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '(100 == 200) {target} (12 >= 12)',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(88 + 4) > (65 + 93) {target} 14 == (8 + 6)',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '(72 + 10) <= (40 + 42) {target} 61 != (52 + 4)',
            answerText: 'จริง',
            answer: 'true'
        }
    ],
    advance: [{
            equation: '((48 + 3) < (57 - 7)) {target} (96 {target} 13)',
            answerText: 'เท็จ',
            answer: 'false'
        },
        {
            equation: '((50 / 5) = 5) {target} (2 + (19 % 4) {target} 5)',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(23 + 10) {target} (17 + 18) {target} (61 != (36 + 28))',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(46 - 18) {target} (30 - 13) && (8 {target} (69 / 8))',
            answerText: 'จริง',
            answer: 'true'
        },
        {
            equation: '(((-17 * 3) + 68) != 17) {target} (20%3) < (-16+13))',
            answerText: 'เท็จ',
            answer: 'false'
        }
    ]
};