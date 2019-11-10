module.exports = {
    coffee: {
        process: [{
            text: [{
                y: 45,
                text: 'Brew coffee'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'Choose to'
            }, {
                y: 70,
                text: 'add milk'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'milk',
            color: '#b668fc',
            photo: ''
        }],
        output: [{
            text: [{
                y: 40,
                text: 'Latte'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }, {
            text: [{
                y: 40,
                text: 'Espresso'
            }],
            type: 'element',
            event: 'op2',
            color: '#56e3c4',
            photo: ''
        }],
        decision: [{
            text: [{
                y: 65,
                text: 'Add milk?'
            }],
            type: 'element',
            event: 'dc1',
            color: '#ff9d00',
            photo: ''
        }]
    },
    steak: {
        process: [{
            text: [{
                y: 45,
                text: 'Prepare beef'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'Prepare pan'
            }],
            type: 'element',
            event: 'pc2',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'Choose'
            }, {
                y: 70,
                text: 'fire level'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'fire',
            color: '#b668fc',
            photo: ''
        }],
        output: [{
            text: [{
                y: 40,
                text: 'Medium rare'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }, {
            text: [{
                y: 40,
                text: 'Medium well'
            }],
            type: 'element',
            event: 'op2',
            color: '#56e3c4',
            photo: ''
        }],
        decision: [{
            text: [{
                y: 65,
                text: 'High level?'
            }],
            type: 'element',
            event: 'dc1',
            color: '#ff9d00',
            photo: ''
        }]
    },
    pasta: {
        process: [{
            text: [{
                y: 45,
                text: 'Prepare pot'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'Boil Spaghetti'
            }],
            type: 'element',
            event: 'pc2',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'Boil fettucine'
            }],
            type: 'element',
            event: 'pc3',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 30,
                text: 'Pour carbonara'
            }, {
                y: 60,
                text: 'to pasta'
            }],
            type: 'element',
            event: 'pc4',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 30,
                text: 'Pour bolognese'
            }, {
                y: 60,
                text: 'to pasta'
            }],
            type: 'element',
            event: 'pc5',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 55,
                text: 'Choose pasta'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'pasta',
            color: '#b668fc',
            photo: ''
        }, {
            text: [{
                y: 55,
                text: 'Choose sauce'
            }],
            type: 'element',
            event: 'ip2',
            inputType: 'sauce',
            color: '#b668fc',
            photo: ''
        }],
        decision: [{
            text: [{
                y: 65,
                text: 'Spaghetti?'
            }],
            type: 'element',
            event: 'dc1',
            color: '#ff9d00',
            photo: ''
        }, {
            text: [{
                y: 65,
                text: 'Carbonara?'
            }],
            type: 'element',
            event: 'dc2',
            color: '#ff9d00',
            photo: ''
        }]
    }
};