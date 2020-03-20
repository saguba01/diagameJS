module.exports = {
    site: {
        title: 'DIAGAME',
        description: 'Systematic thinking is the basic skill that should be in those who work in information technology including and other daily work.'
    },
    button: {
        diagame: 'Sign in with Diagame',
        facebookSignin: 'Sign in with Facebook',
        googleSignin: 'Sign in with Google',
        signin: 'Sign In',
        signup: 'Sign Up',
        signout: 'Sign Out',
        forgot: 'Forgot password?',
        close: 'Close',
        next: 'Next',
        done: 'Done',
        home: 'Home',
        confirm: 'Confirm',
        save: 'Save',
        preview: 'Preview',
        apply: 'Apply',
        add_flowchart: 'New flowchart questions',
        add_logic: 'New logical questions',
        restart: 'Restart'
    },
    form: {
        username: {
            text: 'Username',
            required: 'Enter username'
        },
        email: {
            text: 'Email Address',
            required: 'Enter email address',
            format: 'Email address invalid format'
        },
        password: {
            text: 'Password',
            required: 'Enter password',
            minlength: 'Enter at least 8 characters',
            maxlength: 'Enter no more than 15 characters'
        },
        input: {
            fruit: 'Choose apple type.',
            fire: 'Choose fire level.',
            milk: 'Choose to add milk.',
            pasta: 'Choose pasta type.',
            sauce: 'Choose sauce type.'
        }
    },
    profile: {
        text: 'Profile',
        page: 10,
        unlock: {
            lesson: 'Lessons Unlock',
            menu: 'Menu Unlock'
        }
    },
    achievement: {
        text: 'Achievement',
        page: 11
    },
    intro:{
        nextLabel: 'Next',
        prevLabel: 'Back',
        skipLabel: 'Skip',
        doneLabel: 'Done'
    },
    recipe:'Recipe',
    step: 'Step {num} - ',
    question: 'Questions',
    congrat: 'Congratulations on passing this level!',
    deleteResult : 'Delete Complete!',
    deleteConfirm: 'Confirm Delete?',
    result: 'Congratulations, you score is ',
    fail: 'Wrong flowchart',
    saveResult: 'Save Complete!!',
    feedback:{
        title: 'Feedback',
        text: 'Type Your Comment Here...',
        alert: 'Please Choose Stars For Levels Feedback',
        total:'Total',
        review:'Reviews'
    },
    leaderboard:{
      text: 'Leaderboard',
      rank: 'Rank',
      name: 'Name',
      score: 'Score',
      myranking: 'My Ranking' 
    },
    comment:'Comment',
    
    dashboard: {
        card: {
            total_question: {
                title: 'Total number of questions within the system',
                table : 'Details of all questions within the system',
                unit: 'questions'
            },
            total_user: {
                title: 'Total number of users within the system',
                table : 'Details of all users within the system',
                unit: 'peoples'
            }
        },
        panal: {
            compare: {
                title: 'Comparison report'
            }
        },
        report: {
            line: {
                play_questions: {
                    title: 'Statistics of the number of times the game is played by stages',
                    xUnit: 'List questions',
                    yUnit: 'Amount play'
                },
                playtime_summary: {
                    title: 'Gaming duration statistics by level',
                    xUnit: 'List questions',
                    yUnit: 'Time (second)',
                    max: 'Maximum time',
                    min: 'Minimum time',
                    avg: 'Average time'
                },
                score_summary: {
                    title: 'Statistics of highest, lowest and average scores by stage',
                    xUnit: 'List questions',
                    yUnit: 'Scores',
                    max: 'Maximum score',
                    min: 'Minimum score',
                    avg: 'Average score'
                },
                use_system_back7day: {
                    title: 'Gaming user statistics for the past 7 days',
                    xUnit: 'Date',
                    yUnit: 'Amount of players'
                }
            },
            pie: {
                compare_questions: {
                    compare: {
                        flowchart: 'Flowchart',
                        logic: 'Logic',
                        operator: 'Operator',
                        other: 'Other'
                    },
                    series_name: 'amount',
                    title: 'The proportion of questions in each checkpoint'
                },

            }
        },
        type: [
            {
                title: 'Flowchart',
                value: 'flowchart'
            },
            {
                title: 'Logic',
                value: 'logic'
            },
            {
                title: 'Operator',
                value: 'operator'
            }
        ]


    },
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December '
    ],
    score: {
        header: 'Management score',
        manageScoreMax: {
            title: 'Max score'
        },
        manageScoreMin: {
            title: 'Min score'
        },
        rateScore: {
            rate: {
                title: 'second',
                footer: 'Time'
            },
            score: {
                title: 'Score',
                footer: 'point'
            }
        },
        title: 'Level'
    },
    setting: {
        eng: 'English',
        thai: 'Thai',
        header: 'Setting',
        soundMaster: 'Master',
        soundMusic: 'Music',
        titleLanguage: 'Language',
        titleSound: 'Sound'
    },
    slidebar: {
        dashboard: {
            title: 'Dashboard'
        },
        feedback: {
            title: 'Feedback'
        },
        leaderboard: {
            title: 'Leaderboard'
        },
        management: {
            flowchart: 'Flowchart',
            logic: 'Logic',
            score: 'Score',
            title: 'Management'
        },
        system: {
            sound: 'Sound',
            title: 'System'
        }
    },
    table: {
        actions: 'Actions',
        index: 'No',
        info: {
            entries: 'entries',
            of: 'of',
            showing: 'Showing',
            to: 'to'
        },
        length_menu: {
            display: 'Display',
            records: 'records'
        },
        paginate: {
            first: 'First',
            last: 'Last',
            next: 'Next',
            previous: 'Previous'
        },
        username : 'Username',
        nickname : 'Nickname',
        role : 'Role',
        questions: 'Questions',
        lesson : 'Lesson',
        search_placeholder: 'Search ...'
    },
    tutorial:{
        text: 'Tutorial',
        listMenu:{
            flowchart:{
                path: '/tutorial/flowchart',
                header: 'Flowchart'
            },
            logical: {
                path: '/tutorial/logic',
                header: 'Logical'
            }
        },
        language:{
            header: 'Please select a language',
            value: 'en'
        },
        introStep:{
            step_back_to_home: 'As part of returning to the screen (Home).',
            step_feedback: 'Feedback',
            step_flowchart: 'Is a problem in playing in the flowchart format.',
            step_leaderboard: 'Leaderboard',
            step_logic: 'Is a logic problem.',
            step_logout: 'This is sign out of system',
            step_profile: 'Go to the player profile screen.',
            step_setting: 'Is the language and audio setting.'
        },
        flowchartStep:{
            step1: 'This part will play the game in the form of a flowchart.',
            step2: {
                basic:'Start / End',
                decision: 'Decision',
                io: 'I / O',
                loop: 'Loop',
                play: 'Play',
                process:'Process',
                reset: 'Reset',
                title: 'This section will be a toolbar for playing games, with the following details:'
            },
            step3: 'This section is part of the symbols of the work flow diagram. Which will display the symbol as previously chosen by the player to be used in the next step to get the correct results.',
            step4: 'This section is the area where the answers are placed to get the results that the questions set.',
            step5: 'This section is a helper for answering questions. For players to understand more.',
            step6: 'In this section, it is the part that shows the score of the players which the score will decrease according to the duration and difficulty of the problem.',
            step7: 'In this section, it is the time to do the question.'
        },
        logicalStep: {
            title : 'Logic',
            goToFlowchart: 'Congratulations on passing this level! Click next go to flowchart.',
            step1:'This section is played in a logical fashion involving mathematical operators.',
            step2:'In this section, it is the part that shows the score of the players which the score will decrease according to the duration and difficulty of the problem.',
            step3: 'In this section, it is the time to do the question.',
            step4: 'In this section, it will be the section showing all problem joints.',
            step5: 'This part is a logical question, in which the player has to put the operators in order to get the correct results.',
            step6: 'In this section, it is the part of bringing operators to give correct answers.',
            step7_1: 'Start button for checking',
            step7_2: 'Operator',
            step7_detail : 'Details of the various operators in doing logic problems.',
            step7_header: 'Button'
        },
        welcome: {
            button:{
                learning: 'Start Tutorial'
            },
            header: 'Welcome to DIAGAME',
            logo: 'menu-coaching',
            title: 'Systematic thinking and sequential thinking are the basic skills that should be in those who work in information technology and daily life'
        }
    },
    management:{
        flowchart : {
            title : 'Management of flowchart questions'
        },
        logic : {
            title : 'Management of logic questions s'
        }
    },
    validated: {
        input : {
            empty : 'Plaese enter all informations.',
            level_order : 'Please enter points correctly at each level. (Leading ascending)'
        }
    }
};
