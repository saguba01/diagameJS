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
      (seq % 4 == 0) ? html.push('<div class="menu-list">') : '';
      let bool = false;
      unlock.find(function (obj) {
        if (obj.keyName == key) {
          bool = true;
        }
      });
      bool ? html.push('<div class="menu-block canClick ' + key + '" target="' + key + '"></div>') : html.push('<div class="menu-block canClick question" target="question"></div>');
      (seq % 4 == 3) ? html.push('</div>') : '';
      seq++;
    }
  }
  (html[html.length - 1] != '</div>') ? html.push('</div>') : '';
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

//section game engine helper
/*
 *Description: Display menu recipe.
 *@version 1.0
 *@author Bulakorn Maneesang
 *@since 3 April 2019
 *@required javascript, handlebars.
 */
handlebars.registerHelper('displayRecipeNew', function (lang, HintEN, HintTH) {
  var html = '';
  //var oldLang = Cookies.get('lang')
  if (lang == 'th') {
    html += HintTH + '<br>';
  } else {
    html += HintEN + '<br>';
  }

  return new handlebars.SafeString(html);
});

//section game engine helper
/*
 *Description: change array answer to string.
 *@version 1.0
 *@author Thongthorn Karapakdee
 *@since 29 Feb 2020
 *@required javascript, handlebars.
 */
handlebars.registerHelper('allAnswer', function (obj) {
  var html = '';
  //console.log("LOG", obj);
  for (let index = 0; index < obj.length; index++) {
    for (let index2 = 0; index2 < obj[index].length; index2++) {
      for (let index3 = 0; index3 < obj[0].length; index3++) {
        //console.log("Round", index3);
        if ((obj[index][index2].processTh === obj[0][index3].processTh)) {
          //console.log("OBJ1",obj[index][index2].processTh,obj[index][index2].sequence);
          //console.log("OBJ2",obj[0][index3].processTh,obj[0][index3].sequence);
          if (index2 != obj[index].length - 1) {
            html += obj[0][index3].sequence + ",";
          } else {
            html += obj[0][index3].sequence + "-";
          }
        }
      }
    }
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: convert answe to table for edit question.
 *@version 1.0
 *@author Thongthorn Karapakdee
 *@since 29 Feb 2020
 *@required javascript, handlebars.
 */
handlebars.registerHelper('displayTableEdit', function (obj, addForm) {
  var html = '';
  for (let index = 1; index <= obj.length; index++) {
    if (index == 1) {
      html += "<table id='answerTable_" + index + "'>" +
        "<thead><tr><strong>" +
        "<td style='width: 2%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.step + "</td>" +
        "<td style='text-align: center;width: 35%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.processEn + "</td>" +
        "<td style='text-align: center;width: 35%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.processTh + "</td>" +
        "<td style='text-align: center;width: 15%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.type + "</td>" +
        "<td style='text-align: center;width: 13%;font-size: 20px;font-weight: bold;'></td>" +
        "</strong>";
    } else {
      html += "<div><hr style='border:0px;'><button id='deleteAnswer' class='button btn-delete' onclick='removeAnswer(answerTable_" + index + ",this)'>" +
        "<i class='fa fa-minus'></i> " + addForm.form.answer.text + "</button></div>" +
        "<table id='answerTable_" + index + "'>" +
        "<thead><tr><strong>" +
        "<td style='width: 2%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.step + "</td>" +
        "<td style='text-align: center;width: 35%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.processEn + "</td>" +
        "<td style='text-align: center;width: 35%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.processTh + "</td>" +
        "<td style='text-align: center;width: 15%;font-size: 20px;font-weight: bold;'>" + addForm.form.table.type + "</td>" +
        "<td style='text-align: center;width: 13%;font-size: 20px;font-weight: bold;'></td>" +
        "</strong>";
    }
    html += "</tr></thead><tbody>"
    for (let index2 = 1; index2 <= obj[index - 1].length; index2++) {
      if (index2 == 1) {
        html += "<tr class='sort-disabled'>" +
          "<td class='order'>" + index2 + "</td>" +
          "<td><input type='text' style='width: 95%;' value='Start' id='processEn' disabled></td>" +
          "<td><input type='text' style='width: 95%;' value='เริ่มต้น' id='processTh' disabled></td>" +
          "<td><select style='display: inline;' disabled id='type'>" +
          "<option value='Basic' selected>Basic</option>" +
          "<option value='Input' >Input</option>" +
          "<option value='Output' >Output</option>" +
          "<option value='Process' >Process</option>" +
          "<option value='Decision' >Decision</option>" +
          "</select></td>" +
          "<td><div style='text-align: center;'>" +
          "<button class='book-button blue-button' onclick='addProcess(this)'><i class='fa fa-plus'></i></button>" +
          "</div></td>" +
          "</tr>";
      } else if (index2 == obj[index - 1].length) {
        html += "<tr class='sort-disabled'>" +
          "<td class='order'>" + index2 + "</td>" +
          "<td><input type='text' style='width: 95%;' value='End' id='processEn' disabled></td>" +
          "<td><input type='text' style='width: 95%;' value='สิ้นสุด' id='processTh' disabled></td>" +
          "<td><select style='display: inline;' disabled id='type'>" +
          "<option value='Basic' selected>Basic</option>" +
          "<option value='Input' >Input</option>" +
          "<option value='Output' >Output</option>" +
          "<option value='Process' >Process</option>" +
          "<option value='Decision' >Decision</option>" +
          "</select></td>" +
          "<td>" +
          "</td>" +
          "</tr>";
      } else {
        html += "<tr>" +
          "<td class='order'>" + index2 + "</td>" +
          "<td><input type='text' style='width: 95%;' value='" + obj[index - 1][index2 - 1].processEn + "' id='processEn'></td>" +
          "<td><input type='text' style='width: 95%;' value='" + obj[index - 1][index2 - 1].processTh + "' id='processTh'></td>" +
          "<td><select style='display: inline;' id='type'>" +
          "<option value='0'>" + addForm.form.select.text + "</option>";
        //console.log("type" ,obj[index - 1][index2 -1].type.toLowerCase());
        if (obj[index - 1][index2 - 1].type.toLowerCase() == "basic") {
          html += "<option value='Basic' selected>Basic</option>";
        } else {
          html += "<option value='Basic'>Basic</option>";
        }
        if (obj[index - 1][index2 - 1].type.toLowerCase() == "input") {
          html += "<option value='Input' selected>Input</option>";
        } else {
          html += "<option value='Input'>Input</option>";
        }
        if (obj[index - 1][index2 - 1].type.toLowerCase() == "output") {
          html += "<option value='Output' selected>Output</option>";
        } else {
          html += "<option value='Output'>Output</option>";
        }
        if (obj[index - 1][index2 - 1].type.toLowerCase() == "process") {
          html += "<option value='Process' selected>Process</option>";
        } else {
          html += "<option value='Process'>Process</option>";
        }
        if (obj[index - 1][index2 - 1].type.toLowerCase() == "decision") {
          html += "<option value='Decision' selected>Decision</option>";
        } else {
          html += "<option value='Decision'>Decision</option>";
        }
        html += "</select></td>" +
          "<td><div style='text-align: center;'>" +
          "<div style='overflow:inline;text-align:center;' class='table-action'><button id='addRow' style='padding:5px;' class='book-button btn-add' onclick='addProcess(this)'><i class='fa fa-plus'></i>" +
          "</button><button id='deleteRow' class='book-button btn-delete' onclick='removeProcess(this)' style='margin-left:5px;'><i class='fa fa-minus'></button></div>" +
          "</div></td>" +
          "</tr>";
      }
    }
    html += "</tbody>" +
      "</table>"
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
 *Description: Display process svg.
 *@version 1.0
 *@author Thongthorn Karapakdee
 *@since 20/02/2020
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgProcessNew', function (lang, object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    if (svg.type.toLowerCase() == "process") {
      if (lang == 'th') {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="process">';
        html += '<svg width="210" height="90">';
        html += '<rect class="svgStroke" x="5" y="5" width="200" height="80" rx="10" style="fill:#FECF36"></rect>';
        html += '<text text-anchor="middle" x="105" y="45" alignment-baseline="central" style="font-size:25px;">' + svg.processTh + '</text>';
        html += '</svg>';
        html += '</div>';
      } else {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="process">';
        html += '<svg width="210" height="90">';
        html += '<rect class="svgStroke" x="5" y="5" width="200" height="80" rx="10" style="fill:#FECF36"></rect>';
        html += '<text text-anchor="middle" x="105" y="45" alignment-baseline="central" style="font-size:25px;">' + svg.processEn + '</text>';
        html += '</svg>';
        html += '</div>';
      }

    }

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
 *Description: Display input svg.
 *@version 1.0
 *@author Thongthorn Karapakdee
 *@since 20/02/2020
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgInputNew', function (lang, object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    if (svg.type.toLowerCase() == "input") {
      if (lang == 'th') {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="io" sub="input" data="">';
        html += '<svg width="210" height="105">';
        html += '<g style="fill:#b668fc" transform="translate(0 26.58)">';
        html += '<path class="svgStroke" d="M 194.525390625 71.80303955078125 L 15.47463893890381 71.80303955078125 C 8.320388793945312 71.80303955078125 2.5 66.32384490966797 2.5 59.58900833129883 L 2.5 12.57773113250732 C 2.5 5.842869758605957 8.320388793945312 0.3636751472949982 15.47463893890381 0.3636751472949982 L 15.64449977874756 0.3636751472949982 L 15.81280517578125 0.3407029211521149 L 194.6898498535156 -24.0793342590332 C 198.2745513916016 -24.04719161987305 201.5287780761719 -22.96221351623535 203.8690490722656 -21.0159912109375 C 206.2444458007812 -19.04054641723633 207.5 -16.33832550048828 207.5 -13.20146369934082 L 207.5 59.58900833129883 C 207.5 66.32384490966797 201.6796112060547 71.80303955078125 194.525390625 71.80303955078125 Z"/>';
        html += '</g>';
        html += '<text text-anchor="middle" x="105" y="57" alignment-baseline="central" style="font-size:25px;">' + svg.processTh + '</text>';
        html += '</svg>';
        html += '</div>';
      } else {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="io" sub="input" data="">';
        html += '<svg width="210" height="105">';
        html += '<g style="fill:#b668fc" transform="translate(0 26.58)">';
        html += '<path class="svgStroke" d="M 194.525390625 71.80303955078125 L 15.47463893890381 71.80303955078125 C 8.320388793945312 71.80303955078125 2.5 66.32384490966797 2.5 59.58900833129883 L 2.5 12.57773113250732 C 2.5 5.842869758605957 8.320388793945312 0.3636751472949982 15.47463893890381 0.3636751472949982 L 15.64449977874756 0.3636751472949982 L 15.81280517578125 0.3407029211521149 L 194.6898498535156 -24.0793342590332 C 198.2745513916016 -24.04719161987305 201.5287780761719 -22.96221351623535 203.8690490722656 -21.0159912109375 C 206.2444458007812 -19.04054641723633 207.5 -16.33832550048828 207.5 -13.20146369934082 L 207.5 59.58900833129883 C 207.5 66.32384490966797 201.6796112060547 71.80303955078125 194.525390625 71.80303955078125 Z"/>';
        html += '</g>';
        html += '<text text-anchor="middle" x="105" y="57" alignment-baseline="central" style="font-size:25px;">' + svg.processEn + '</text>';
        html += '</svg>';
        html += '</div>';
      }

    }
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
 *Description: Display output svg.
 *@version 1.0
 *@author Thongthorn Karapakdee
 *@since 20/02/2020
 *@required javascript, handlebars.
 */
handlebars.registerHelper('svgOutputNew', function (lang, object) {
  var html = '';
  var arraySVG = shuffle(object);
  arraySVG.forEach(function (svg) {
    if (svg.type.toLowerCase() == "output") {
      if (lang == 'th') {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="io" sub="output">';
        html += '<svg width="210" height="90">';
        html += '<g style="fill:#56e3c4">';
        html += '<path class="svgStroke" d="M 167.8278961181641 80.61994171142578 L 43.19696044921875 80.61994171142578 L 3.561671495437622 41.55996704101562 L 43.19696044921875 2.49999475479126 L 167.8278961181641 2.49999475479126 C 173.1891937255859 2.49999475479126 178.3884735107422 3.534078121185303 183.2813262939453 5.573550224304199 C 188.0061645507812 7.542966842651367 192.2494506835938 10.36232852935791 195.8932800292969 13.95327281951904 C 199.5345764160156 17.54171752929688 202.3928070068359 21.71896743774414 204.3885498046875 26.36896705627441 C 206.4531707763672 31.17935562133789 207.5 36.29035568237305 207.5 41.55996704101562 C 207.5 46.8295783996582 206.4531707763672 51.94057846069336 204.3885498046875 56.75096893310547 C 202.3928070068359 61.40096664428711 199.5345764160156 65.57821655273438 195.8932800292969 69.16666412353516 C 192.2494506835938 72.75760650634766 188.0061645507812 75.57696533203125 183.2813262939453 77.54638671875 C 178.3884735107422 79.58585357666016 173.1891937255859 80.61994171142578 167.8278961181641 80.61994171142578 Z"/>';
        html += '</g>';
        html += '<text text-anchor="middle" x="105" y="40" alignment-baseline="central" style="font-size:25px;">' + svg.processTh + '</text>';

        html += '</svg>';
        html += '</div>';
      } else {
        html += '<div type="element" event="' + svg.sequence + '" photo="" source="io" sub="output">';
        html += '<svg width="210" height="90">';
        html += '<g style="fill:#56e3c4">';
        html += '<path class="svgStroke" d="M 167.8278961181641 80.61994171142578 L 43.19696044921875 80.61994171142578 L 3.561671495437622 41.55996704101562 L 43.19696044921875 2.49999475479126 L 167.8278961181641 2.49999475479126 C 173.1891937255859 2.49999475479126 178.3884735107422 3.534078121185303 183.2813262939453 5.573550224304199 C 188.0061645507812 7.542966842651367 192.2494506835938 10.36232852935791 195.8932800292969 13.95327281951904 C 199.5345764160156 17.54171752929688 202.3928070068359 21.71896743774414 204.3885498046875 26.36896705627441 C 206.4531707763672 31.17935562133789 207.5 36.29035568237305 207.5 41.55996704101562 C 207.5 46.8295783996582 206.4531707763672 51.94057846069336 204.3885498046875 56.75096893310547 C 202.3928070068359 61.40096664428711 199.5345764160156 65.57821655273438 195.8932800292969 69.16666412353516 C 192.2494506835938 72.75760650634766 188.0061645507812 75.57696533203125 183.2813262939453 77.54638671875 C 178.3884735107422 79.58585357666016 173.1891937255859 80.61994171142578 167.8278961181641 80.61994171142578 Z"/>';
        html += '</g>';
        html += '<text text-anchor="middle" x="105" y="40" alignment-baseline="central" style="font-size:25px;">' + svg.processEn + '</text>';

        html += '</svg>';
        html += '</div>';
      }

    }
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
handlebars.registerHelper('listquestion', function (question, scoreh, general) {
  var html = '';
  var index = 0;
  var type = '';
  console.log("List", question);
  var color = ["bg-red", "bg-purple", "bg-blue", "bg-sky-blue", "bg-light-green", "bg-orange", "bg-nude"];
  if (typeof question === 'undefined') {
    html += 'ggg';
  } else {
    question.forEach(function (qs) {
      var mark = 0;
      var score = 0;
      var max = 0;
      if (qs.Type == 'logic') {
        type = 'logic';
      } else if (qs.Type == 'operator') {
        type = 'operator';
      } else {
        type = 'diagram';
      }

      html += '<div onclick="window.location.replace(\'/lesson/' + type + '/' + qs.Id + '\');" class="' + color[index] + ' qs canClick" style="margin-left:40px; margin-bottom:-2px; padding-right:1px; padding-left:6px;  border:2px solid black">';
      html += '<div class="list-lesson-title" id="lesson-logic">';
      html += qs.Name;
      scoreh.forEach(function (sc) {
        if (sc.questionId == qs.Id && sc.type == qs.Type) {
          mark = 1;
          if (sc.score > max) {
            score = sc.score;
            max = score;
          }
        }
      })
      html += '<div class="menu-block " style="float:right;">';
      if (mark == 1) {
        html += '<span class="mark-question"></span>';
      }
      html += '</div>';
      html += '<br>';
      html += general.home.level + ': ';
      for (var i = 0; i < qs.Level; i++) {
        html += '<i class="fa fa-star fa-fw" style="color:#FECF36;"></i>'
      }
      html += '</li>'
      html += '</div>';
      html += '<div class="list-lesson-score" id="score">';
      html += general.home.score + ': '
      html += score;
      html += '</div>';
      html += '</div>';
      index++;
      if (index > 6) {
        index = 0;
      }
    });
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: List Comment for Feedback
 *@version 1.0
 *@author Jirapat Lapudomsakda
 *@since 19 April 2019
 *@required javascript, handlebars.
 */

handlebars.registerHelper('listcomment', function (feedback) {
  var html = '';
  feedback.forEach(function (fb) {
    if (fb.Comment != 'empty') {
      html += '<div class="bg-light-green comment-box">';
      html += fb.Name + ' : ' + fb.Comment;
      html += '<br>';
      for (var i = 0; i < fb.Level; i++) {
        html += '<i class="fa fa-star fa-fw" style="color:#FECF36; font-size:12px;"></i>'
      }
      html += '</div>';
    }
  });
  return new handlebars.SafeString(html);
});

handlebars.registerHelper('listscore', function (score) {
  var html = '';
  var index = 0;
  var no = 4;
  var color = ["list-bg-blue", "list-bg-white"]
  score.forEach(function (sc) {
    html += '<div class="list-table-leaderboard ' + color[index] + '">';
    html += no + ' ' + sc.nickname;
    html += '</div>';
    index++;
    no++;
    if (index >= 1) {
      index = 0;
    }
  });
  return new handlebars.SafeString(html);
});



handlebars.registerHelper('listquestionadmin', function (question) {
  var html = '';
  var index = 0;
  var type = '';
  var score = 0;
  var max = 0;
  var color = ["bg-red", "bg-purple", "bg-blue", "bg-sky-blue", "bg-light-green", "bg-orange", "bg-nude"];
  if (Object.getOwnPropertyNames(question).length === 0) {
    html += 'ggg';
  } else {
    question.forEach(function (qs) {
      if (qs.Type == 'logic') {
        type = 'logic';
      } else if (qs.Type == 'operator') {
        type = 'operator';
      }
      html += '<div target="/lesson/' + type + '/' + qs.Id + '" class="' + color[index] + ' qs canClick" style="margin-left:40px; padding-right:1px; border:2px solid black">';
      html += '<div class="list-lesson-title" id="lesson-logic">';
      html += qs.Name;
      html += '<div class="menu-block " style="float:right;">';
      html += '</div>';
      html += '<br>';
      html += 'Level:';
      for (var i = 0; i < qs.Level; i++) {
        html += '<i class="fa fa-star fa-fw" style="color:#FECF36;"></i>'
      }
      html += '</li>'
      html += '</div>';
      html += '</div>';
      score = 0;
      index++;
      if (index > 6) {
        index = 0;
      }
    });
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: List Progressbar of Feedback
 *@version 1.0
 *@author Jirapat Lapudomsakda
 *@since 19 April 2019
 *@required javascript, handlebars.
 */

handlebars.registerHelper('listprogressbar', function (feedback) {
  var html = '';
  var color = ['bg-blue', 'bg-light-green', 'bg-yellow', 'bg-orange', 'bg-red'];
  var index = 0;
  //Stars
  var level1 = 0;
  var level2 = 0;
  var level3 = 0;
  var level4 = 0;
  var level5 = 0;
  var total = 0; // all feedback

  // Persen Progressbar
  var percent1 = 0;
  var percent2 = 0;
  var percent3 = 0;
  var percent4 = 0;
  var percent5 = 0;
  feedback.forEach(function (fb) {
    if (fb.Level == 5) {
      level5++;
      total++;
    } else if (fb.Level == 4) {
      level4++;
      total++;
    } else if (fb.Level == 3) {
      level3++;
      total++;
    } else if (fb.Level == 2) {
      level2++;
      total++;
    } else if (fb.Level == 1) {
      level1++;
      total++;
    }
  });

  //Calculate Persen for 
  percent5 = Math.floor((level5 / total) * 100);
  percent4 = Math.floor((level4 / total) * 100);
  percent3 = Math.floor((level3 / total) * 100);
  percent2 = Math.floor((level2 / total) * 100);
  percent1 = Math.floor((level1 / total) * 100);

  var percent = [percent5, percent4, percent3, percent2, percent1]
  var level = [level5, level4, level3, level2, level1]
  for (var i = 5; i > 0; i--) {
    html += '<div class="side">';
    html += '<span>' + i + '</span><i class="fa fa-star fa-fw" style="color:#FECF36;"></i>';
    html += '</div>';
    html += '<div class="mid hint--top" aria-label="' + level[index] + '">';
    html += '<div class="progressbars">';
    html += '<div class="' + color[index] + ' stars" style="width:' + percent[index] + '%"></div>';
    html += '</div>';
    html += '</div>';
    index++;
  }
  return new handlebars.SafeString(html);
});

/*
 *Description: Ratingstars of Feedback
 *@version 1.0
 *@author Jirapat Lapudomsakda
 *@since 19 April 2019
 *@required javascript, handlebars.
 */

handlebars.registerHelper('ratingstar-feedback', function (feedback) {
  var html = '';
  var total = 0;
  var rating = 0;
  var level5 = 0;
  var level4 = 0;
  var level3 = 0;
  var level2 = 0;
  var level1 = 0;
  var allstars = 0;
  feedback.forEach(function (fb) {
    if (fb.Level == 5) {
      level5++;
      total++;
    } else if (fb.Level == 4) {
      level4++;
      total++;
    } else if (fb.Level == 3) {
      level3++;
      total++;
    } else if (fb.Level == 2) {
      level2++;
      total++;
    } else if (fb.Level == 1) {
      level1++;
      total++;
    }
  })
  allstars = (level5 * 5) + (level4 * 4) + (level3 * 3) + (level2 * 2) + (level1 * 1);
  rating = allstars / total;
  rating = Math.round(rating * 10) / 10;
  if (rating >= 5) {
    rating = 5;
  }
  html += '<div class="rating text-rating">' + rating + '</div>';
  html += '<div class="rating-stars">';
  for (var i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      html += '<i class="fa fa-star fa-fw" style="color:#FECF36;"></i>';
    } else {
      html += '<i class="fa fa-star fa-fw" style="color:#f1f1f1;"></i>';
    }
  }
  html += '</div>';
  html += '<p style="margin-left:20px; font-weight: bold; font-size:20px;">Total : ' + total + ' reviews</p>';
  return new handlebars.SafeString(html);
});

handlebars.registerHelper('totalfeedback', function (feedback) {
  html = '';
  total = 0;
  feedback.forEach(function (fb) {
    total++;
  });
  html = "Total : " + total + " comment";
  return new handlebars.SafeString(html);
})

/*
 *Description: Genarate card of rate score 
 *@version 1.0
 *@author Supachai Boonying
 *@since 06 Mar 2020
 *@required javascript.
 */
handlebars.registerHelper('card-level', function (level, ganaral) {
  var html = '';
  const color = ["#8bc3a0", "#c5f8c8", "#faf096", "#fccb8f", "#f9989f"]
  level.forEach((value, index) => {
    html += `
    <div class="card dia-3" style="background-color: ${color[index]};">
      <div class="card-heading" style="color: black;text-align: center;">
          <span>${ganaral.title} ${index + 1}</span>
      </div>
      <div class="card-body" style="height:70%;display: flex;">
        <div class="card-body-left card-text-center dia-6" style="display: grid; height: 100%; ">
          <span>${ganaral.rateScore.rate.title}</span>
          <span style="font-size:48px;font-weight: bold;">${value.rate}</span>
          <span>${ganaral.rateScore.rate.footer}</span>
        </div>
        <div class="card-body-right card-text-center dia-6" style="display: grid; height: 100%; ">
          <span>${ganaral.rateScore.score.title}</span>
          <span style="font-size:48px;font-weight: bold;">${value.score}</span>
          <span>${ganaral.rateScore.score.footer}</span>
        </div>
      </div>
    </div>
    `
  })
  return new handlebars.SafeString(html);
});

/*
 *Description: Genarate option of select 
 *@version 1.0
 *@author Supachai Boonying
 *@since 06 Mar 2020
 *@required javascript.
 */
handlebars.registerHelper('list-option-question', function (obj) {
  var html = '';
  obj.forEach((value, index) => {
    html += ` <option value="${value.value}" ${(index == 0 ? "selected" : "")}>${value.title}</option>`
  })
  return new handlebars.SafeString(html);
});
