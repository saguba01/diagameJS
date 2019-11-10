module.exports = {
    juice: {
        process: [{
            text: [{
                y: 45,
                text: 'Blender'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'Select'
            }, {
                y: 70,
                text: 'apple size'
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
                text: 'Apple juice'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }]
    },
    toast: {
        process: [{
            text: [{
                y: 30,
                text: 'Put bread'
            }, {
                y: 60,
                text: 'into toaster'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'Select'
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
                text: 'Toast'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }]
    },
    bacon: {
        process: [{
            text: [{
                y: 30,
                text: 'Prepare pan &'
            }, {
                y: 60,
                text: 'put the bacon'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'Select'
            }, {
                y: 70,
                text: 'fire level'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'fire',
            color: '#b668fc',
            photo: ''
        }, {
            text: [{
                y: 55,
                text: 'Select time'
            }],
            type: 'element',
            event: 'ip2',
            inputType: 'time',
            color: '#b668fc',
            photo: ''
        }],
        output: [{
            text: [{
                y: 40,
                text: 'Bacon'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }]
    }
};