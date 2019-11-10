module.exports = {
    question: {
        name: '?????',
        description: '???????????????????????????',
        photo: 'question.svg'
    },
    glass: {
        name: 'แก้วน้ำ',
        description: 'แก้วน้ำที่ว่างเปล่า',
        photo: 'variable/juice/achievement-glass.svg',
        unlock: ['pc1']
    },
    orangeGlass: {
        name: 'น้ำส้มพร้อมดื่ม',
        description: 'น้ำส้มที่ถูกบรรจงเทใส่แก้วช่วยเพิ่มความสดชื่นให้แก่ผู้ดื่ม',
        photo: 'variable/juice/achievement-orangeGlass.svg',
        unlock: ['pc1-pc2']
    },
    orangeOutsideGlass: {
        name: 'น้ำส้มเทไม่ตรงแก้ว',
        description: 'น้ำส้มที่ถูกเทอย่างรีบร้อนจนหกออกนอกแก้ว',
        photo: 'variable/juice/achievement-orangeOutsideGlass.svg',
        unlock: ['pc2-pc1']
    },
    orangeJuice: {
        name: 'น้ำส้มหก',
        description: 'น้ำส้มหกหมดแล้ว',
        photo: 'variable/juice/achievement-orangeJuice.svg',
        unlock: ['pc2']
    },
    cereal: {
        name: 'ซีเรียลเปล่าๆ',
        description: 'ซีเรียลเปล่าใส่ชามสำหรับรับประทานเป็นขนมขบเคี้ยวมีประโยชน์จากธัญพืช',
        photo: 'variable/cereal/cereals.svg',
        unlock: ['pc1-pc3-pc4', 'pc3-pc1-pc4']
    },
    milk:{
        name: 'นมสดเปล่าๆ',
        description: 'นมสดเปล่าในชามพร้อมดื่ม',
        photo: 'variable/cereal/milk.svg',
        unlock: ['pc1-pc2-pc4','pc2-pc1-pc4']
    },
    completeCereal: {
        name: 'ซีเรียลพร้อมทาน',
        description: 'ซีเรียลแสนอร่อยที่จะทำให้คุณได้รับคุณค่าจากสารอาหารในมื้อเช้าได้อย่างเต็มที่',
        photo: 'variable/cereal/cereals-cereals.svg',
        unlock: ['pc1-pc2-pc3-pc4', 'pc1-pc3-pc2-pc4', 'pc2-pc1-pc3-pc4', 'pc2-pc3-pc1-pc4', 'pc3-pc1-pc2-pc4', 'pc3-pc2-pc1-pc4']
    },
    salad: {
        name: 'สลัดออแกนิค',
        description: 'สลัดผักปลอดสารพิษที่มีการคัดเลือกผักออแกนิคคุณภาพดีคลุกเคล้ากับน้ำสลัดแสนอร่อย',
        photo: 'variable/salad/salad.svg',
        unlock: ['pc1-pc2-pc3-pc4-pc5', 'pc1-pc3-pc2-pc4-pc5', 'pc2-pc1-pc3-pc4-pc5', 'pc2-pc3-pc1-pc4-pc5', 'pc3-pc1-pc2-pc4-pc5', 'pc3-pc2-pc1-pc4-pc5']
    },
    saladOutsideBowl: {
        name: 'สลัดพื้นบ้าน (พื้นไม้)',
        description: 'สิ่งที่สำคัญอย่างนึงในการทำอาหารคือความสะอาด เตือนแล้วนะ!',
        photo: 'variable/salad/saladOutsideBowl.svg',
        unlock: ['pc2-pc3-pc4-pc5', 'pc3-pc2-pc4-pc5', 'pc2-pc3-pc4-pc5', 'pc2-pc3-pc4-pc5', 'pc3-pc2-pc4-pc5', 'pc3-pc2-pc4-pc5','pc1-pc2-pc3-pc5', 'pc1-pc3-pc2-pc5', 'pc2-pc1-pc3-pc5', 'pc2-pc3-pc1-pc5', 'pc3-pc1-pc2-pc5', 'pc3-pc2-pc1-pc5','pc2-pc3-pc5', 'pc3-pc2-pc5', 'pc2-pc3-pc5', 'pc2-pc3-pc5', 'pc3-pc2-pc5', 'pc3-pc2-pc5']
    },
    organicVegetables: {
        name: 'ผักออแกนิค',
        description: 'ผักออแกนิคสดใหม่จากสวนและปลอดสารพิษ',
        photo: 'variable/salad/organicVegetables.svg',
        unlock: ['pc1-pc2-pc4-pc5', 'pc1-pc2-pc4-pc5', 'pc2-pc1-pc4-pc5', 'pc2-pc1-pc4-pc5', 'pc1-pc2-pc4-pc5', 'pc2-pc1-pc4-pc5']
    },
    saladDressing: {
        name: 'น้ำสลัด',
        description: 'น้ำสลัดทีี่ใช้สำหรับทานคู่กับผักเพื่อให้มีรสชาติที่ดีขึ้น',
        photo: 'variable/salad/saladDressing.svg',
        unlock: ['pc1-pc3-pc4-pc5', 'pc1-pc3-pc4-pc5', 'pc1-pc3-pc4-pc5', 'pc3-pc1-pc4-pc5', 'pc3-pc1-pc2-pc4-pc5', 'pc3-pc1-pc4-pc5']
    },
    appleJuice: {
        name: 'น้ำแอปเปิ้ลคั้นสด',
        description: 'น้ำแอปเปิ้ลที่ถูกคั้นมาอย่างดีจากแอปเปิ้ลชั้นยอด',
        photo: 'input_output/apple-juice/applejuice.svg',
        unlock: ['ip1-slice-pc1-op1']
    },
    appleIsTooBig: {
        name: 'แอปเปิ้ลใหญ่เกินไป',
        description: 'แอปเปิ้ลใหญ่เกินไปที่จะใส่เครื่องคั้นน้ำผลไม้ลองหั่นเป็นชิ้นเล็กๆน่าจะดีกว่านะ',
        photo: 'input_output/apple-juice/apple.svg',
        unlock: ['ip1-full-pc1-op1']
    },
    bread: {
        name: 'ขนมปังนุ่มนิ่ม',
        description: 'ขนมปังที่ทั้งอ่อนนุ่มและขาวเนียน ถ้าอยากได้ขนมปังปิ้งลองเพิ่มความร้อนของไฟอีกหน่อยนะ',
        photo: 'input_output/bread/bread1.svg',
        unlock: ['pc1', 'pc1-ip1-low-op1']
    },
    toast: {
        name: 'ขนมปังปิ้ง',
        description: 'ขนมปังที่ถูกปิ้งด้วยอุณหภูมิที่พอเหมาะทำให้ได้เนื้อสัมผัสที่กรุบกรอบส่งกลิ่นหอมน่ารับประทาน',
        photo: 'input_output/bread/bread2.svg',
        unlock: ['pc1-ip1-mid-op1']
    },
    burnedBread: {
        name: 'ฺขนมปังไหม้เกรียม',
        description: 'ขนมปังที่ได้รับความร้อนจากแสงแดดในเวลาเที่ยงวันของประเทศไทย',
        photo: 'input_output/bread/bread3.svg',
        unlock: ['pc1-ip1-high-op1']
    },
    bacon: {
        name: 'เบคอนดิบ',
        description: 'เบคอนชุ่มฉ่ำ ถ้าอยากกินเบคอนกรอบๆลองเพิ่มความร้อนอีกหน่อยนะ',
        photo:'input_output/bacon/bacon1.svg',
        unlock: ['pc1-ip1-low-ip2-three-op1','pc1-ip1-low-ip2-five-op1','pc1-ip1-mid-ip2-three-op1','pc1-ip2-three-ip1-low-op1','pc1-ip2-five-ip1-low-op1','pc1-ip2-three-ip1-mid-op1','pc1-ip2-three-op1','pc1-ip2-five-op1','pc1-ip2-ten-op1']
    },
    crispyBacon: {
        name: 'เบคอนกรอบ',
        description: 'เบคอนที่ผ่าานการทอดในอุณหภูมิที่เหมาะสมจนกรอบหอมพร้อมรับประทาน',
        photo:'input_output/bacon/bacon2.svg',
        unlock: ['pc1-ip1-mid-ip2-five-op1','pc1-ip1-low-ip2-ten-op1','pc1-ip1-high-ip2-three-op1','pc1-ip2-five-ip1-mid-op1','pc1-ip2-ten-ip1-low-op1','pc1-ip2-three-ip1-high-op1']
    },
    burntBacon:{
        name: 'เบคอนไหม้เกรียม',
        description: 'เบคอนไหม้เกรียมส่งกลิ่นเหม็นไหม้ ลองลดความร้อนดูนะเผื่ออะไรจะดีขึ้น',
        photo:'input_output/bacon/bacon3.svg',
        unlock: ['pc1-ip1-high-op1','pc1-ip1-low-op1','pc1-ip1-mid-op1','pc1-ip1-mid-ip2-ten-op1','pc1-ip1-high-ip2-ten-op1','pc1-ip1-high-ip2-five-op1','pc1-ip2-ten-ip1-mid-op1','pc1-ip2-ten-ip1-high-op1','pc1-ip2-five-ip1-high-op1']
    },
    latte: {
        name: 'ลาเต้',
        description: 'เครื่องดื่มกาแฟที่เตรียมด้วยนมร้อน',
        photo: 'condition/coffee/latte.svg',
        unlock: ['pc1-ip1-true-dc1-op1']
    },
    espresso: {
        name: 'เอสเปรสโซ่',
        description: 'กาแฟที่มีรสแก่และเข้ม มีวิธีการชงโดยใช้แรงอัดไอน้ำหรือน้ำร้อนผ่านเมล็ดกาแฟคั่วที่บดละเอียด',
        photo: 'condition/coffee/espresso.svg',
        unlock: ['pc1-ip1-flase-dc1-op2']
    },
    mediumRareSteak: {
        name: 'สเต็กสุกน้อย',
        description: 'สเต็กที่ทำให้สุกๆดิบๆ ยังมีน้ำเลือดอยู่',
        photo: 'condition/steak/steak1.svg',
        unlock: ['pc1-pc2-ip1-false-dc1-op1', 'pc2-pc1-ip1-false-dc1-op1']
    },
    mediumWellSteak: {
        name: 'สเต็กสุกมาก',
        description: 'สเต็กที่สุกแล้วแต่ยังไม่สุกมาก ยังมีน้ำเลือดอยู่เล็กน้อย',
        photo: 'condition/steak/steak2.svg',
        unlock: ['pc1-pc2-ip1-true-dc1-op2', 'pc2-pc1-ip1-true-dc1-op2']
    },
    spaghettiCarbonara: {
        name: 'สปาเก็ตตี้คาโบนาร่า',
        description: 'พาสต้ารูปแบบหนึ่งที่มีเส้นเป็นลักษณะกลมยาว ราดด้วยซอสคาโบนาร่า',
        photo: 'condition/spaghetti/spaghettiCarbonara.svg',
        unlock: ['ip1-pc1-dc1-true-pc2-ip2-dc2-true-pc4', 'pc1-ip1-dc1-true-pc2-ip2-dc2-true-pc4']
    },
    spaghettiBolognese: {
        name: 'สปาเก็ตตี้โบลองเนส',
        description: 'พาสต้ารูปแบบหนึ่งที่มีเส้นเป็นลักษณะกลมยาว ราดด้วยซอสบาลองเนส',
        photo: 'condition/spaghetti/spaghettiBolognese.svg',
        unlock: ['ip1-pc1-dc1-true-pc2-ip2-dc2-false-pc5', 'pc1-ip1-dc1-true-pc2-ip2-dc2-false-pc5']
    },
    fettucineCarbonara: {
        name: 'เฟตตุชินีคาโบนาร่า',
        description: 'พาสต้ารูปแบบหนึ่งที่มีเส้นเป็นลักษณะแบนยาว ราดด้วยซอสคาโบนาร่า',
        photo: 'condition/spaghetti/fettucineCarbonara.svg',
        unlock: ['ip1-pc1-dc1-false-pc3-ip2-dc2-true-pc4', 'pc1-ip1-dc1-false-pc3-ip2-dc2-true-pc4']
    },
    fettucineBolognese: {
        name: 'เฟตตุชินีโบลองเนส',
        description: 'พาสต้ารูปแบบหนึ่งที่มีเส้นเป็นลักษณะแบนยาว ราดด้วยซอสบาลองเนส',
        photo: 'condition/spaghetti/fettucineBolognese.svg',
        unlock: ['ip1-pc1-dc1-false-pc3-ip2-dc2-false-pc5', 'pc1-ip1-dc1-false-pc3-ip2-dc2-false-pc5']
    }

};