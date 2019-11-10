module.exports = {
    juice: {
        process: [{
            text: [{
                y: 45,
                text: 'ปั่นน้ำ'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 40,
                text: 'เลือกขนาด'
            }, {
                y: 75,
                text: 'แอปเปิ้ล'
            }],
            type: 'element',
            event: 'ip1',
            color: '#b668fc',
            photo: ''
        }],
        output: [{
            text: [{
                y: 40,
                text: 'น้ำแอปเปิ้ล'
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
                text: 'นำขนมปัง'
            }, {
                y: 60,
                text: 'ใส่เครื่องปิ้ง'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 55,
                text: 'เลือกระดับไฟ'
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
                text: 'ขนมปังปิ้ง'
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
                text: 'ตั้งกระทะและ'
            }, {
                y: 60,
                text: 'ใส่เบคอน'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 55,
                text: 'เลือกระดับไฟ'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'fire',
            color: '#b668fc',
            photo: ''
        }, {
            text: [{
                y: 55,
                text: 'เลือกเวลา'
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
                text: 'เบคอน'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }]
    }
};