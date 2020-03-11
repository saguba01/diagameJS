module.exports = {
    site: {
        title: 'ไดอะเกม',
        description: 'การคิดอย่างเป็นระบบเป็นทักษะพื้นฐานที่ควรอยู่ในกลุ่มคนที่ทำงานด้านเทคโนโลยีสารสนเทศรวมถึงงานประจำวันอื่น ๆ'
    },
    button: {
        diagame: 'เข้าสู่ระบบด้วยไดอะเกม',
        facebookSignin: 'เข้าสู่ระบบด้วยเฟซบุ๊ก',
        googleSignin: 'เข้าสู่ระบบด้วยกูเกิล',
        signin: 'ลงชื่อเข้าใช้',
        signup: 'สมัครใช้งาน',
        signout: 'ออกจากระบบ',
        forgot: 'ลืมรหัสผ่าน?',
        close: 'ปิด',
        next: 'ถัดไป',
        done: 'เสร็จสิ้น',
        home: 'หน้าหลัก',
        confirm: 'ยืนยัน',
        save: 'บันทึก',
        preview: 'ตัวอย่าง',
        add_flowchart: 'เพิ่มคำถามแผนผังลำดับงาน',
        add_logic: 'เพิ่มคำถามเชิงตรรกะ',
        apply: 'ใช้งาน',
        restart: 'เล่นอีกครั้ง'
    },
    form: {
        username: {
            text: 'ชื่อผู้ใช้',
            required: 'ป้อนชื่อผู้ใช้'
        },
        email: {
            text: 'อีเมล',
            required: 'ป้อนอีเมล',
            format: 'รูปแบบอีเมลไม่ถูกต้อง'
        },
        password: {
            text: 'รหัสผ่าน',
            required: 'ป้อนรหัสผ่าน',
            minlength: 'ป้อนอย่างน้อย 8 ตัวอักษร',
            maxlength: 'ป้อนไม่เกิน 15 ตัวอักษร'
        },
        input: {
            fruit: 'เลือกชนิดของแอปเปิ้ล',
            fire: 'เลือกระดับไฟ',
            milk: 'เลือกเติมนม',
            pasta: 'เลือกชนิดของเส้นพาสต้า',
            sauce: 'เลือกชนิดของซอส'
        }
    },
    profile: {
        text: 'โปรไฟล์',
        page: 10,
        unlock: {
            lesson: 'บทเรียนที่ปลดล็อค',
            menu: 'เมนูอาหารที่ปลดล็อค'
        }
    },
    achievement: {
        text: 'ความสำเร็จ',
        page: 11
    },
    intro: {
        nextLabel: 'ถัดไป',
        prevLabel: 'ก่อนหน้า',
        skipLabel: 'ข้าม',
        doneLabel: 'เสร็จสิ้น'
    },
    recipe: 'สูตรอาหาร',
    step: 'ขั้นตอนที่ {num} - ',
    question: 'คำถาม',
    congrat: 'ขอแสดงความยินดีที่ผ่านระดับนี้!',
    deleteResult : 'ลบสำเร็จ!',
    deleteConfirm: 'ยืนยันการลบ?',
    result: 'ยินดีด้วย คุณทำคะแนนได้ ',
    fail: 'แผนผังลำดับการทำงานไม่ถูกต้อง',
    saveResult: 'บันทึกสำเร็จ!!',
    feedback:{
        title: 'ข้อเสนอแนะ',
        text: 'พิมพ์ข้อเสนอแนะลงตรงนี้...'
    },
    comment: 'ความคิดเห็น',
    dashboard: {
        card: {
            total_question: {
                title: 'จำนวนคำถามทั้งหมดภายในระบบ',
                table : 'รายละเอียดคำถามทั้งหมดภายในระบบ',
                unit: 'ข้อ'
            },
            total_user: {
                title: 'จำนวนผู้ใช้งานทั้งหมดภายในระบบ',
                table : 'รายละเอียดผู้ใช้งานทั้งหมดภายในระบบ',
                unit: 'คน'
            }
        },
        panal: {
            compare: {
                title: 'รายงานการเปรียบเทียบ'
            }
        },
        report: {
            line: {
                play_questions: {
                    title: 'รายงานเปรียบเทียบจำนวนการเล่นเกมในแต่ละบทการเรียนรู้',
                    xUnit: 'รายชื่อคำถาม',
                    yUnit: 'จำนวนการเล่น'
                },
                playtime_summary: {
                    title: 'รายงานการเปรียบเทียบระยะเวลาของเกมในแต่ละบทเรียน',
                    xUnit: 'รายชื่อคำถาม',
                    yUnit: 'ระยะเวลา (วินาที)',
                    max: 'ระยะเวลามากที่สุด',
                    min: 'ระยะเวลาน้อยที่สุด',
                    avg: 'ระยะเวลาเฉลี่ย'
                },
                score_summary: {
                    title: 'รายงานการเปรียบเทียบคะแนนของแต่ละบทเรียนที่ต้องเรียนรู้',
                    xUnit: 'รายชื่อคำถาม',
                    yUnit: 'คะแนน',
                    max: 'คะแนนมากที่สุด',
                    min: 'คะแนนน้อยที่สุด',
                    avg: 'คะแนนเฉลี่ย'
                },
                use_system_back7day: {
                    title: 'รายงานการเล่นเข้าเล่น 7 วันย้อนหลัง',
                    xUnit: 'วัน',
                    yUnit: 'จำนวนผู้เล่น'
                }
            },
            pie: {
                compare_questions: {
                    compare: {
                        flowchart: 'แผนภาพลำดับความคิด',
                        logic: 'ตรรกะ',
                        operator: 'ตัวดำเนินการ',
                        other: 'อื่น ๆ'
                    },
                    series_name: 'จำนวน',
                    title: 'รายงานจะเปรียบเทียบจำนวนคำถามในแต่ละบทการเรียนรู้'
                },

            }
        },
        type: [
            {
                title: 'แผนภาพลำดับความคิด',
                value: 'flowchart'
            },
            {
                title: 'ตรรกะ',
                value: 'logic'
            },
            {
                title: 'ตัวดำเนินการ',
                value: 'operator'
            }
        ]


    },
    months: [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'พฤษภาคม',
        'มิถุนายน',
        'กรกฎาคม',
        'สิงหาคม',
        'กันยายน',
        'ตุลาคม',
        'พฤศจิกายน',
        'ธันวาคม'
    ],
    score: {
        header: 'การจัดการข้อมูลคะแนน',
        manageScoreMax: {
            title: 'คะแนนมากสุด'
        },
        manageScoreMin: {
            title: 'คะแนนน้อยสุด'
        },
        rateScore: {
            rate: {
                title: 'เวลา',
                footer: 'วินาที'
            },
            score: {
                title: 'ลดคะแนน',
                footer: 'คะแนน'
            }
        },
        title: 'เลเวล'
    },
    setting: {
        eng: 'อังกฤษ',
        thai: 'ไทย',
        header: 'การตั้งค่า',
        soundMaster: 'เสียงหลัก',
        soundMusic: 'เสียงเพลง',
        titleLanguage: 'ภาษา',
        titleSound: 'เสียง'
    },
    slidebar: {
        dashboard: {
            title: 'แดชบอร์ด'
        },
        feedback: {
            title: 'ข้อเสนอแนะ'
        },
        leaderboard: {
            title: 'กระดานคะแนน'
        },
        management: {
            flowchart: 'แผนผังความคิด',
            logic: 'ตรรกะ',
            score: 'คะแนน',
            title: 'การจัดการ'
        },
        system: {
            sound: 'เสียง',
            title: 'ระบบ'
        }
    },
    table: {
        actions: 'ตัวดำเนินการ',
        index: 'ลำดับ',
        info: {
            entries: 'รายการ',
            of: 'จาก',
            showing: 'กำลังแสดง',
            to: 'ถึง'
        },
        length_menu: {
            display: 'แสดง',
            records: 'รายการ'
        },
        paginate: {
            first: 'หน้าแรก',
            last: 'หน้าสุดท้าย',
            next: 'ถัดไป',
            previous: 'ย้อนกลับ'
        },
        questions: 'คำถาม',
        username : 'ชื่อผู้เล่น',
        nickname : 'ชื่อเล่น',
        role : 'บทบาท',
        lesson : 'บทเรียน',
        search_placeholder: 'ค้นหา ...'
    },
    tutorial:{
        text: 'แนะนำการเล่นเบื้องต้น',
        listMenu:{
            flowchart:{
                path: '/tutorial/flowchart',
                header: 'แผนภาพลำดับการทำงาน'
            },
            logical: {
                path: '/tutorial/logic',
                header: 'ตรรกะ'
            }
        },
        language:{
            header: 'กรุณาเลือกภาษา',
            value: 'th'
        },
        introStep:{
            step_back_to_home: 'เป็นส่วนของการย้อนกลับสู่หน้าจอหลัก (Home)',
            step_feedback: 'ข้อเสนอแนะ',
            step_flowchart: 'เป็นโจทย์ปัญหาในการเล่นในรูปแบบแผนภาพแสดงลำดับขั้นตอนการทำงาน',
            step_leaderboard: 'กระดานคะแนน',
            step_logic: 'เป็นโจทย์ปัญหาในการเล่นในรูปแบบตรรกะ',
            step_logout: 'เป็นการออกจากระบบ',
            step_profile: 'ไปยังหน้าจอโปรไฟล์ของผู้เล่น',
            step_setting: 'เป็นการตั้งค่าของภาษาและเสียง '
        },
        flowchartStep:{
            step1: 'ส่วนนี้จะเป็นการเล่นเกมในรูปแบบของแผนภาพแสดงลำดับขั้นตอนการทำงาน',
            step2: {
                basic:'เริ่ม / สิ้นสุด',
                decision: 'การตัดสินใจ',
                io: 'รับ/แสดงผล',
                loop: 'การทำงานแบบทำซ้ำ',
                play: 'เล่น',
                process:'การกระทำ',
                reset: 'รีเซ็ต',
                title: 'ในส่วนนี้จะเป็นแถบเครื่องมือสำหรับใช้ในการเล่นเกมโดยจะมีรายละเอียดดังนี้'
            },
            step3: 'ในส่วนนี้เป็นส่วนของสัญลักษณ์ของแผนภาพลำดับการทำงาน โดยจะแสดงสัญลักษณ์ตามที่ผู้เล่นได้เลือกไว้ก่อนหน้านี้เพื่อใช้ในการนำไปวางในขั้นตอนถัดไปให้ได้ผลลัพธ์ที่ถูกต้อง',
            step4: 'ส่วนนี้เป็นพื้นสำหรับนำคำตอบมาวางเพื่อให้ได้ผลลัพธ์ตามที่คำถามกำหนดไว้',
            step5: 'ในส่วนนี้เป็นตัวช่วยสำหรับตอบถาม เพื่อให้ผู้เล่นเข้าใจมากยิ่งขึ้น',
            step6: 'ในส่วนนี้เป็นส่วนของการแสดงคะแนนของผู้เล่นโดยคะแนนจะลดตามระยะเวลาและความยากของโจทย์นั้น ๆ',
            step7: 'ในส่วนนี้เป็นระยะเวลาในการทำโจทย์นั้น ๆ'
        },
        logicalStep: {
            title : 'Logic',
            goToFlowchart: 'ขอแสดงความยินดีที่ผ่านระดับนี้! กดถัดไปเพื่อไปหน้าเล่นแผนภาพลำดับการทำงาน',
            step1:'ในส่วนนี้เป็นการเล่นในรูปแบบตรรกที่เกี่ยวข้องกับตัวดำเนินการทางคณิตศาสตร์',
            step2:'ในส่วนนี้เป็นส่วนของการแสดงคะแนนของผู้เล่นโดยคะแนนจะลดตามระยะเวลาและความยากของโจทย์นั้น ๆ',
            step3: 'ในส่วนนี้เป็นระยะเวลาในการทำโจทย์นั้น ๆ ',
            step4: 'ในส่วนนี้จะเป็นส่วนของการแสดงข้อต่อโจทย์ทั้งหมด',
            step5: 'ในส่วนนี้เป็นส่วนของโจทย์คำถามในรูปแบบตรรกโดยผู้เล่นจะต้องทำการนำตัวดำเนินการมาใส่เพื่อให้ได้ผลลัพธ์ที่ถูกต้อง',
            step6: 'ในส่วนนี้จะเป็นส่วนของการนำตัวดำเนินการเพื่อให้คำตอบถูกต้อง',
            step7_1: 'ปุ่มเริ่มทำการตรวจสอบ',
            step7_2: 'ตัวดำเนินการ',
            step7_detail : 'รายละเอียดปุ่มตัวดำเนินการต่าง ๆ ในการทำโจทย์ตรรกะ',
            step7_header: 'ปุ่ม'
        },
        welcome: {
            button:{
                learning: 'เริ่มต้มให้คำแนะนำ'
            },
            header: 'ยินดีต้อนรับเข้าสู่ DIAGAME',
            logo: 'menu-coaching',
            title: 'การคิดอย่างเป็นระบบและการจัดลำดับความคิดเป็นทักษะพื้นฐานที่ควรมีในผู้ที่ทำงานทางด้านเทคโนโลยีสารสนเทศ'
        }
    },
    management:{
        flowchart : {
            title : 'การจัดการคำถามแผนผังลำดับการทำงาน'
        },
        logic : {
            title : 'การจัดการคำถามเชิงตรรกะ'
        }
    },
    validated: {
        input : {
            empty : 'กรุณากรอกข้อมูลให้ครบถ้วน',
            level_order : 'กรุณากรอกคะแนนแต่ละเลเวลให้ถูกต้อง (เรียงจากน้อยไปมาก)'
        }
    }
};