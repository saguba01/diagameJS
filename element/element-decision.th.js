module.exports = {
    coffee: {
        process: [{
            text: [{
                y: 45,
                text: 'ชงกาแฟ'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 55,
                text: 'เลือกเติมนม'
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
                text: 'ลาเต้'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }, {
            text: [{
                y: 40,
                text: 'เอสเปรสโซ่'
            }],
            type: 'element',
            event: 'op2',
            color: '#56e3c4',
            photo: ''
        }],
        decision: [{
            text: [{
                y: 65,
                text: 'เติมนม?'
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
                text: 'เตรียมเนื้อวัว'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'เตรียมกระทะ'
            }],
            type: 'element',
            event: 'pc2',
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
                text: 'สเต็กสุกน้อย'
            }],
            type: 'element',
            event: 'op1',
            color: '#56e3c4',
            photo: ''
        }, {
            text: [{
                y: 40,
                text: 'สเต็กสุกมาก'
            }],
            type: 'element',
            event: 'op2',
            color: '#56e3c4',
            photo: ''
        }],
        decision: [{
            text: [{
                y: 65,
                text: 'ไฟแรง?'
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
                text: 'เตรียมหม้อ'
            }],
            type: 'element',
            event: 'pc1',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'ต้มเส้นสปาเก็ตตี้'
            }],
            type: 'element',
            event: 'pc2',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 45,
                text: 'ต้มเส้นเฟตตุชินี'
            }],
            type: 'element',
            event: 'pc3',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 30,
                text: 'เทคาโบนาร่า'
            }, {
                y: 60,
                text: 'ลงบนพาสต้า'
            }],
            type: 'element',
            event: 'pc4',
            color: '#FECF36',
            photo: ''
        }, {
            text: [{
                y: 30,
                text: 'เทโบลองเนส'
            }, {
                y: 60,
                text: 'ลงบนพาสต้า'
            }],
            type: 'element',
            event: 'pc5',
            color: '#FECF36',
            photo: ''
        }],
        input: [{
            text: [{
                y: 55,
                text: 'เลือกเส้นพาสต้า'
            }],
            type: 'element',
            event: 'ip1',
            inputType: 'pasta',
            color: '#b668fc',
            photo: ''
        }, {
            text: [{
                y: 55,
                text: 'เลือกซอส'
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
                text: 'สปาเก็ตตี้?'
            }],
            type: 'element',
            event: 'dc1',
            color: '#ff9d00',
            photo: ''
        }, {
            text: [{
                y: 65,
                text: 'คาโบนาร่า?'
            }],
            type: 'element',
            event: 'dc2',
            color: '#ff9d00',
            photo: ''
        }]
    }

};