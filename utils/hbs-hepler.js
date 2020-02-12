// https://handlebarsjs.com
var handlebars = require('handlebars');

/*
 *Description: Link to current language stylesheets.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('linklang', function (param) {
  var lang = ['en'];
  if (lang.indexOf(param) == -1) {
    param = 'en';
  }
  return new handlebars.SafeString(
    '<link rel="stylesheet" href="/stylesheets/fonts/font.' + param + '.css"/>'
  );
});

/*
 *Description: If equal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('ifeq', function (param1, param2, options) {
  if (param1 == param2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/*
 *Description: If gather than.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('ifgt', function (param1, param2, options) {
  if (param1 > param2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/*
 *Description: If less than.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('iflt', function (param1, param2, options) {
  if (param1 < param2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/*
 *Description: If gather or equal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('ifgeq', function (param1, param2, options) {
  if (param1 >= param2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/*
 *Description: If less or equal.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('ifleq', function (param1, param2, options) {
  if (param1 <= param2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/*
 *Description: Json stringtify.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('json', function (context) {
  var string = JSON.stringify(context);
  return string;
});

/*
 *Description: Sub string.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('substr', function (string, start, end) {
  return string.substr(start, end);
});

//section home page helper
/*
 *Description: Create line.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('lines', function (lines) {
  var html = '';
  for (var index = 0; index < lines; index++) {
    html += '<div class="line"></div>';
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: New line.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 20 Mar 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('breaklines', function (text) {
  text = handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new handlebars.SafeString(text);
});

/*
 *Description: Create menu block.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 11 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('menublock', function (object, unlock) {
  var html = []
  var seq = 0;
  for (var key in object) {
    if (key != 'question') {
      (seq % 4 == 0) ? html.push('<div class="menu-list">'): '';
      let bool = false;
      unlock.find(function (obj) {
        if (obj.keyName == key) {
          bool = true;
        }
      });
      bool ? html.push('<div class="menu-block canClick ' + key + '" target="' + key + '"></div>') : html.push('<div class="menu-block canClick question" target="question"></div>');
      (seq % 4 == 3) ? html.push('</div>'): '';
      seq++;
    }
  }
  (html[html.length - 1] != '</div>') ? html.push('</div>'): '';
  return new handlebars.SafeString(html.join(''));
});

handlebars.registerHelper('locked', function (array, lesson, subLesson) {
  if (array.indexOf(lesson + '-' + subLesson) == -1) {
    return 'postit-disable'
  }
});

handlebars.registerHelper('lessonUnlock', function (list, unlock) {
  var listSize = 0;
  for (var key in list) {
    for (var subKey in list[key].subLesson) {
      listSize++;
    }
  }
  return new handlebars.SafeString(unlock.length + '/' + listSize);
});

handlebars.registerHelper('achievementUnlock', function (list, unlock) {
  var listSize = 0;
  for (var key in list) {
    key != 'question' ? listSize++ : '';
  }
  return new handlebars.SafeString(unlock.length + '/' + listSize);
});
//end section

//section game engine helper
/*
 *Description: Display menu recipe.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('displayRecipe', function (label, object) {
  var html = '';
  var index;
  for (index = 0; index < object.material.length; index++) {
    html += '&#9656; ' + object.material[index] + '<br>';
    if ((index + 1) == object.material.length) {
      html += '<hr>';
    }
  }
  for (index = 0; index < object.step.length; index++) {
    html += label.replace('{num}', (index + 1)) + object.step[index] + '<br>';
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: Display process svg.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgProcess', function (object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    html += '<div type="' + svg.type + '" event="' + svg.event + '" photo="' + svg.photo + '" source="process">';
    html += '<svg width="210" height="90">';
    html += '<rect class="svgStroke" x="5" y="5" width="200" height="80" rx="10" style="fill:' + svg.color + '"></rect>';
    for (var index in svg.text) {
      var text = svg.text[index];
      html += '<text text-anchor="middle" x="105" y="' + text.y + '" alignment-baseline="central" style="font-size:25px;">' + text.text + '</text>';
    }
    html += '</svg>';
    html += '</div>';
  });
  return new handlebars.SafeString(html);
});

/*
 *Description: Display input svg.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgInput', function (object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    html += '<div type="' + svg.type + '" event="' + svg.event + '" photo="' + svg.photo + '" source="io" sub="input" data="' + svg.inputType + '">';
    html += '<svg width="210" height="105">';
    html += '<g style="fill:' + svg.color + '" transform="translate(0 26.58)">';
    html += '<path class="svgStroke" d="M 194.525390625 71.80303955078125 L 15.47463893890381 71.80303955078125 C 8.320388793945312 71.80303955078125 2.5 66.32384490966797 2.5 59.58900833129883 L 2.5 12.57773113250732 C 2.5 5.842869758605957 8.320388793945312 0.3636751472949982 15.47463893890381 0.3636751472949982 L 15.64449977874756 0.3636751472949982 L 15.81280517578125 0.3407029211521149 L 194.6898498535156 -24.0793342590332 C 198.2745513916016 -24.04719161987305 201.5287780761719 -22.96221351623535 203.8690490722656 -21.0159912109375 C 206.2444458007812 -19.04054641723633 207.5 -16.33832550048828 207.5 -13.20146369934082 L 207.5 59.58900833129883 C 207.5 66.32384490966797 201.6796112060547 71.80303955078125 194.525390625 71.80303955078125 Z"/>';
    html += '</g>';
    for (var index in svg.text) {
      var text = svg.text[index];
      html += '<text text-anchor="middle" x="105" y="' + text.y + '" alignment-baseline="central" style="font-size:25px;">' + text.text + '</text>';
    }
    html += '</svg>';
    html += '</div>';
  });
  return new handlebars.SafeString(html);
});

/*
 *Description: Display output svg.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgOutput', function (object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    html += '<div type="' + svg.type + '" event="' + svg.event + '" photo="' + svg.photo + '" source="io" sub="output">';
    html += '<svg width="210" height="90">';
    html += '<g style="fill:' + svg.color + '">';
    html += '<path class="svgStroke" d="M 167.8278961181641 80.61994171142578 L 43.19696044921875 80.61994171142578 L 3.561671495437622 41.55996704101562 L 43.19696044921875 2.49999475479126 L 167.8278961181641 2.49999475479126 C 173.1891937255859 2.49999475479126 178.3884735107422 3.534078121185303 183.2813262939453 5.573550224304199 C 188.0061645507812 7.542966842651367 192.2494506835938 10.36232852935791 195.8932800292969 13.95327281951904 C 199.5345764160156 17.54171752929688 202.3928070068359 21.71896743774414 204.3885498046875 26.36896705627441 C 206.4531707763672 31.17935562133789 207.5 36.29035568237305 207.5 41.55996704101562 C 207.5 46.8295783996582 206.4531707763672 51.94057846069336 204.3885498046875 56.75096893310547 C 202.3928070068359 61.40096664428711 199.5345764160156 65.57821655273438 195.8932800292969 69.16666412353516 C 192.2494506835938 72.75760650634766 188.0061645507812 75.57696533203125 183.2813262939453 77.54638671875 C 178.3884735107422 79.58585357666016 173.1891937255859 80.61994171142578 167.8278961181641 80.61994171142578 Z"/>';
    html += '</g>';
    for (var index in svg.text) {
      var text = svg.text[index];
      html += '<text text-anchor="middle" x="105" y="' + text.y + '" alignment-baseline="central" style="font-size:25px;">' + text.text + '</text>';
    }
    html += '</svg>';
    html += '</div>';
  });
  return new handlebars.SafeString(html);
});

/*
 *Description: Display decision svg.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgDecision', function (object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    html += '<div type="' + svg.type + '" event="' + svg.event + '" condition="' + svg.condition + '" photo="' + svg.photo + '" source="decision">';
    html += '<svg width="180" height="140" id = "startDecision">';
    html += '<g style="fill:' + svg.color + '" transform="translate(-151.285 -459.879)">';
    html += '<path class="svgStroke" d="M 240.0689697265625 585.6941528320312 C 240.0688018798828 585.6941528320312 240.0686340332031 585.6941528320312 240.0684661865234 585.6941528320312 C 237.6892547607422 585.6939697265625 235.7074584960938 584.5126342773438 235.4666748046875 584.3630981445312 C 233.2030487060547 582.7356567382812 165.2165374755859 533.8528442382812 156.1564788818359 526.9512329101562 C 154.4459075927734 525.2117919921875 153.6540222167969 523.6123657226562 153.8026123046875 522.19580078125 C 154.0010681152344 520.3037109375 155.8444671630859 519.0299072265625 155.8629913330078 519.0179443359375 L 155.8787689208984 519.0076904296875 L 155.8943939208984 518.9972534179688 C 156.5011749267578 518.5909423828125 216.7229156494141 478.2682189941406 238.6222991943359 463.7493286132812 C 240.416015625 462.8276977539062 241.8176574707031 462.3793640136719 242.9041900634766 462.3793640136719 C 244.1767883300781 462.3793640136719 245.2744140625 462.98974609375 247.0721588134766 464.0712585449219 C 271.819580078125 482.4646301269531 314.2715759277344 515.3623046875 322.8254089355469 521.99951171875 C 324.5881958007812 523.69482421875 325.42333984375 525.3404541015625 325.3080749511719 526.89208984375 C 325.1823120117188 528.5849609375 323.9371948242188 529.8847045898438 323.2872619628906 530.3429565429688 C 314.4147033691406 536.3781127929688 303.4544372558594 543.8505859375 291.8516235351562 551.7611083984375 C 274.8117065429688 563.3785400390625 257.191650390625 575.3914794921875 243.9697113037109 584.3618774414062 L 243.9250183105469 584.3922119140625 L 243.8816680908203 584.4244384765625 C 242.7325286865234 585.27880859375 241.4853820800781 585.6941528320312 240.0689697265625 585.6941528320312 Z"/>';
    html += '</g>';
    for (var index in svg.text) {
      var text = svg.text[index];
      html += '<text text-anchor="middle" x="90" y="' + text.y + '" alignment-baseline="central" style="font-size:25px;">' + text.text + '</text>';
    }
    // html += '<text text-anchor="middle" x="90" y="65" alignment-baseline="central" style="font-size:25px;">If</text>';
    html += '</svg>';
    html += '</div>';
  });
  return new handlebars.SafeString(html);
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//end section

//section mini game helper
/*
 *Description: Display operator question.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 19 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('operatorQuestion', function (question) {
  var html = '';
  var index = 0;
  question.forEach(function (qs) {
    var seq = 1;
    var array = qs.equation.split('{target}');
    html += '<div class="question' + (index == 0 ? ' active' : '') + '" question="' + (index + 1) + '">';
    array.forEach(function (value) {
      html += '<div class="questionText" type="operand" style="margin-right: 20px;' + (seq > 1 ? 'margin-left: 60px;' : '') + '" event="' + value + '">' + value + '</div>';
      array.length != seq ? html += '<div class="boxAnswer" type = "operator" style="margin-left: -10px;margin-top: 25px;"></div>' : '';
      seq++;
    });
    html += '<div class="questionText" type="result" event="' + qs.answer + '"> = ' + qs.answer + '</div>'
    html += '</div>';
    index++;
  });
  return new handlebars.SafeString(html);
});

/*
 *Description: Display operator question.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 19 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('logicQuestion', function (question) {
  var html = '';
  var index = 0;
  question.forEach(function (qs) {
    var seq = 1;
    var array = qs.equation.split('{target}');
    html += '<div class="question' + (index == 0 ? ' active' : '') + '" question="' + (index + 1) + '">';
    array.forEach(function (value) {
      html += '<div class="questionText" type="operand" style="margin-right: 20px;' + (seq > 1 ? 'margin-left: 60px;' : '') + '" event="' + value + '">' + value + '</div>';
      array.length != seq ? html += '<div class="boxAnswer" type = "operator" style="margin-left: -10px;margin-top: 25px;"></div>' : '';
      seq++;
    });
    html += '<div class="questionText" type="result" event="' + qs.answer + '"> = ' + qs.answerText + '</div>'
    html += '</div>';
    index++;
  });
  return new handlebars.SafeString(html);
});
//end section

/*
 *Description: List Question For HomePage
 *@version 1.0
 *@author Jirapat Lapudomsakda
 *@since 19 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('listquestion', function(question){
  var html = '';
  var index = 0;
  var color = ["bg-red","bg-purple","bg-blue","bg-sky-blue","bg-light-green","bg-yellow","bg-orange","bg-nude"];
  question.forEach(function (qs){
    html += '<div class="'+color[index]+'" style="margin-left:40px; padding-right:1px; border:2px solid black">';
    html += '<div class="list-lesson-title" id="lesson-logic">';
    html += qs.Name;
    html += '</div>';
    html += '<div class="list-lesson-score" id="score">';
    html += 'Score : ';
    html += '</div>';
    html += '</div>';
    index++;
    if(index > 7){
      index = 0;
    }
  });
  return new handlebars.SafeString(html);
});