/**
 * Copyright (C) 2013, SILILAB, JSC - All Rights Reserved -
 * http://www.sililab.com
 *
 * This software is released under the terms of the proprietary license.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

/**
 * @author THOQ-LUONG
 * Mar 15, 2015 8:23:30 AM
 * 
 * @param {type} $scope
 * @param {type} $http
 * @param {type} $rootScope
 * @returns {BaseController}
 */
function BaseController($scope, $http, $rootScope) {
    var VIETNAMESE_N_ASCII_MAP = {
        "à": "a", "ả": "a", "ã": "a", "á": "a", "ạ": "a", "ă": "a", "ằ": "a", "ẳ": "a", "ẵ": "a",
        "ắ": "a", "ặ": "a", "â": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ấ": "a", "ậ": "a", "đ": "d",
        "è": "e", "ẻ": "e", "ẽ": "e", "é": "e", "ẹ": "e", "ê": "e", "ề": "e", "ể": "e", "ễ": "e",
        "ế": "e", "ệ": "e", "ì": 'i', "ỉ": 'i', "ĩ": 'i', "í": 'i', "ị": 'i', "ò": 'o', "ỏ": 'o',
        "õ": "o", "ó": "o", "ọ": "o", "ô": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ố": "o", "ộ": "o",
        "ơ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ớ": "o", "ợ": "o", "ù": "u", "ủ": "u", "ũ": "u",
        "ú": "u", "ụ": "u", "ư": "u", "ừ": "u", "ử": "u", "ữ": "u", "ứ": "u", "ự": "u", "ỳ": "y",
        "ỷ": "y", "ỹ": "y", "ý": "y", "ỵ": "y", "À": "A", "Ả": "A", "Ã": "A", "Á": "A", "Ạ": "A",
        "Ă": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ắ": "A", "Ặ": "A", "Â": "A", "Ầ": "A", "Ẩ": "A",
        "Ẫ": "A", "Ấ": "A", "Ậ": "A", "Đ": "D", "È": "E", "Ẻ": "E", "Ẽ": "E", "É": "E", "Ẹ": "E",
        "Ê": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ế": "E", "Ệ": "E", "Ì": "I", "Ỉ": "I", "Ĩ": "I",
        "Í": "I", "Ị": "I", "Ò": "O", "Ỏ": "O", "Õ": "O", "Ó": "O", "Ọ": "O", "Ô": "O", "Ồ": "O",
        "Ổ": "O", "Ỗ": "O", "Ố": "O", "Ộ": "O", "Ơ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ớ": "O",
        "Ợ": "O", "Ù": "U", "Ủ": "U", "Ũ": "U", "Ú": "U", "Ụ": "U", "Ư": "U", "Ừ": "U", "Ử": "U",
        "Ữ": "U", "Ứ": "U", "Ự": "U", "Ỳ": "Y", "Ỷ": "Y", "Ỹ": "Y", "Ý": "Y", "Ỵ": "Y"
    };
    $scope.locations = [];

    $scope.toFriendlyString = function (originalString) {
        if (originalString == null || originalString.length == 0) {
            return originalString;
        }
        //ELSE:
        var removedDuplicatedSpacesString = originalString.replace(/\s+/g, " ");
        var removedVietnameseCharsString = "";
        for (var idx = 0; idx < removedDuplicatedSpacesString.length; idx++) {
            var ch = removedDuplicatedSpacesString[idx];
            var alternativeChar = VIETNAMESE_N_ASCII_MAP[ch];
            if (alternativeChar != null) {
                removedVietnameseCharsString += alternativeChar;
            } else {
                removedVietnameseCharsString += ch;
            }
        }
        return removedVietnameseCharsString.toLowerCase()
                .replace(/[^0-9a-zA-Z]/g, "-")
                .replace(/\-+/g, "-");
    };

    $scope.summarizeDateTime = function (dateTime, withYear) {
        if (dateTime != null) {
            var outputFormat = "$3/$2";
            if (withYear) {
                outputFormat += "/$1";
            }
            outputFormat += " $4:$5";
            return dateTime.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):.*/, outputFormat);
        }
    };

    $scope.summarizeDate = function (dateTime, withYear) {
        if (dateTime != null) {
            var outputFormat = "$3/$2";
            if (withYear) {
                outputFormat += "/$1";
            }
            return dateTime.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):.*/, outputFormat);
        }
    };

    $scope.summarizeTime = function (dateTime) {
        if (dateTime != null) {
            return dateTime.replace(/\d{4}-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):.*/, "$3:$4");
        }
    };

    $scope.toVietnameseDate = function (dateTime, withYear) {
        if (dateTime != null && dateTime.length > 0) {
            var outputFormat = "$3/$2";
            if (withYear) {
                outputFormat += "/$1";
            }
            return dateTime.replace(/(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2}):.*)?/, outputFormat);
        } else {
            return "";
        }
    };

    $scope.vietnameseDateToTimestamp = function (dateString) {
        var retVal = null;
        if (!$scope.isValidVietnameseDate(dateString)) {
            return retVal;
        }
        //ELSE:
        var dateParts = dateString.match(/^\s*(\d{2})\/(\d{2})\/((?:19|20)\d{2})\s*$/);
        var day = dateParts[1];
        var month = dateParts[2];
        var year = dateParts[3];
        var date = new Date(year, month - 1, day);
        retVal = date.getTime() / 1000;
        //return
        return retVal;
    };

    $scope.isValidVietnameseDate = function (dateString) {
        var retVal = false;
        if (dateString == null || dateString.length != 10) {
            return retVal;
        }
        //ELSE:        
        var dateParts = dateString.match(/^\s*(\d{2})\/(\d{2})\/((?:19|20)\d{2})\s*$/);
        if (dateParts == null || dateParts.length != 4) {
            return retVal;
        }
        //ELSE:
        var day = dateParts[1];
        var month = dateParts[2];
        var year = dateParts[3];
        var date = new Date(year, month - 1, day);
        var b = date.getMonth() + 1 != month
                || date.getFullYear() != year
                || date.getDate() != day;
        retVal = !b;
        //return
        return retVal;
    };

    $scope.moneyToString = function (price) {
        if (price == null || price.toString().match(/^\-?[0-9]+(\.[0-9]+)?$/) == null) {
            return "NA";
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    $scope.extractLocation = function (address) {
        var retVal = null;
        if (address == null || address.length == 0) {
            return retVal;
        }
        //ELSE:
        var friendlyAddress = $scope.toFriendlyString(address);
        var currentScore = -1;
        for (var idx = 0; idx < $scope.locations.length; idx++) {
            var location = $scope.locations[idx];
            for (var idx2 = 0; idx2 < location.keywords.length; idx2++) {
                var keyword = location.keywords[idx2];
                var score = friendlyAddress.lastIndexOf(keyword);
                if (score != -1 && score > currentScore) {
                    retVal = location;
                    currentScore = score;
                }
            }
        }
        //return
        return retVal;
    };

    $scope.isEmptyString = function (string) {
        var regex = /^\s*$/;
        var retVal = string == null || (typeof string.match == "function" && string.match(regex) != null);
        return retVal;
    };

    $scope.isValidEmail = function (email) {
        var regex = /^[\w\.]+@[\w\.]+\.\w{2,5}$/;
        var retVal = email != null && email.match(regex) != null;
        return retVal;
    };

    $scope.isValidPhone = function (phone) {
        if (phone == null) {
            return false;
        }
        //ELSE:
        var stdPhone = $scope.standardizePhone(phone);
        var regex = /^0(9\d{8}|1\d{9}|[2345678]\d{7,14})$/;
        return stdPhone.match(regex) != null;
    };

    $scope.standardizePhone = function (phone) {
        if (phone == null) {
            return phone;
        }
        //ELSE:
        return phone.replace(/[^0-9]/g, "");
    };

    $scope.formatPhone = function (phone) {
        if (phone == null) {
            return phone;
        }
        var stdPhone = $scope.standardizePhone(phone);
        return stdPhone.replace(/^(\d+)(\d{3})(\d{3})$/, "$1-$2-$3");
    };

    $scope.setPageTitle = function (title) {
        if (title == null) {
            $("title").text("Hello, this's Chiaki System Admin");
        } else {
            $("title").text(title);
        }
    };

    $scope.calculateHash = function (map, exceptKeys) {
        var retVal = null;
        if (map == null) {
            return retVal;
        }
        var keys = Object.keys(map);
        var sortedKeys = keys.sort(function (a, b) {
            return map[b] - map[a];
        });
        retVal = "";
        sortedKeys.forEach(function (key) {
            var isExceptedKey = false;
            if (exceptKeys != null) {
                exceptKeys.forEach(function (exceptedKey) {
                    if (key == exceptedKey) {
                        isExceptedKey = true;
                    }
                });
            }
            if (!isExceptedKey) {
                var value = map[key];
                if (value != null) {
                    value = ("" + value).toLowerCase();
                }
                if (retVal.length > 0) {
                    retVal += ";";
                }
                retVal += key + ":" + value;
            }
        });
        //return
        return retVal;
    };

    $scope.showLoading = function () {
        $rootScope.$broadcast("header.showLoading");
    };

    $scope.hideLoading = function () {
        $rootScope.$broadcast("header.hideLoading");
    };

    $scope.getByCode = function (list, code) {
        var retVal = null;
        list.forEach(function (item) {
            if (item.code == code) {
                retVal = item;
            }
        });
        //return
        return retVal;
    };

    $scope.getByField = function (list, fieldName, value) {
        var retVal = null;
        list.forEach(function (item) {
            if (item[fieldName] == value) {
                retVal = item;
            }
        });
        //return
        return retVal;
    };

    $scope.subSring = function (string, subLength) {
        if (typeof string === 'undefined' || string === null || string === '') {
            return '';
        }
        var subString = string.substring(0, subLength);
        if (string.length > subString.length) {
            subString = subString + '...';
        }

        return subString;
    };

    this.getKeyCode = function (event) {
        var retVal = event.which == 0 ? event.keyCode : event.which;
        return retVal;
    };
    $scope.formatFloat = function (floatValue, decimalDigitsCount) {
        var retVal = "";
        var intValue = Math.floor(floatValue);
        retVal += $scope.formatInt(intValue);
        if (decimalDigitsCount > 0) {
            retVal += ",";
            var parts = ("" + floatValue).split(".");
            var decimalPart = (parts.length == 2) ? parts[1] : "";
            for (var idx = 0; idx < decimalDigitsCount; idx++) {
                if (idx >= decimalPart.length) {
                    retVal += "0";
                } else {
                    retVal += decimalPart[idx];
                }
            }
        }
        //return
        return retVal;
    };

    $scope.formatInt = function (intValue) {
        return Math.floor(intValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    $scope.timestampToDate = function (time) {
        var retVal = "";
        var d = new Date(time);
        retVal = (d.getDate() + 100 + " ").substring(1, 3) + '/' + (d.getMonth() + 101 + " ").substring(1, 3) + '/' + d.getFullYear();
        return retVal;
    }
    this.roundingInt = function (integerValue, zerosCount) {
        var retVal = integerValue;
        var stdZerosCount = zerosCount != null ? zerosCount : 3;
        var roundingValue = Math.pow(10, stdZerosCount);
        var oddPart = integerValue % roundingValue;
        retVal -= oddPart;
        if (oddPart >= roundingValue / 2) {
            retVal += roundingValue;
        }
        //return
        return retVal;
    };

    this.roundingFloat = function (floatValue, decimalDigitsCount) {
        var valueParts = ("" + floatValue).split(".");
        if (valueParts.length != 1 && valueParts.length != 2) {
            return "NA";
        }
        //ELSE:
        var retVal = parseInt(valueParts[0]);
        if (decimalDigitsCount == 0 || valueParts.length == 1) {
            return retVal;
        }
        //ELSE:
        var decimalPart = valueParts[1];
        var stdDecimalPart = decimalPart.substring(0, decimalDigitsCount);
        if (decimalPart.length > decimalDigitsCount
                && parseInt(decimalPart[decimalDigitsCount]) >= 5) {
            stdDecimalPart = "" + (parseInt(stdDecimalPart) + 1);
        }
        var retVal = parseFloat(valueParts[0] + "." + stdDecimalPart);
        //return
        return retVal;
    };

    this.parseFloat = function (value) {
        if (Number(value) === value) {
            return value;
        }
        var valueParts = getNumberValueParts(value);
        if (valueParts.length != 1 && valueParts.length != 2) {
            return "NA";
        }
        //ELSE:
        var integerPart = valueParts[0];
        var retVal = parseInt(integerPart);
        if (valueParts.length == 2) {
            var decimalPart = valueParts[1];
            retVal += parseInt(decimalPart) / Math.pow(10, decimalPart.length);
        }
        //return
        return retVal;
    };

    this.parseInt = function (string) {
        if (Number(string) === string) {
            if (string % 1 === 0) {
                return string;
            } else {
                return Math.floor(string);
            }
        }
        var valueParts = getNumberValueParts(string);
        if (valueParts.length != 1 && valueParts.length != 2) {
            return "NA";
        }
        //ELSE:
        var retVal = valueParts[0];
        //return
        return retVal;
    };

    /**
     * is valid integer or decimal number
     * @param {type} value
     * @returns {undefined}
     */
    this.isValidNumber = function (value) {
        if (!isNaN(value)) {
            return true;
        }
        //ELSE:
        var retVal = false;
        var valueParts = getNumberValueParts(value);
        if (valueParts.length == 1 || valueParts.length == 2) {
            retVal = true;
        }
        //return
        return retVal;
    };

    this.initialize = function (callback) {
        locations.forEach(function (location) {
            location.keywords = JSON.parse(location.keywords);
            location.meta_data = JSON.parse(location.meta_data);
        });
        $scope.locations = locations;
        if (callback != null) {
            callback();
        }
    };

    this.openDialogModal = function (selector) {
        $(selector).modal({
            modal: true,
            persist: true,
            position: [30, 0],
            autoPosition: true
        });
    };

    this.initTinymce = function (selector, height, readonly) {
        height = height == null ? 250 : height;
        readonly = readonly == null ? 0 : readonly;
        tinymce.init({
            selector: selector,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen imageupload",
                "insertdatetime media table contextmenu paste textcolor productLink"
            ],
            toolbar: "fontselect | fontsizeselect | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | imageupload | templateInsert | productLink",
            fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 20pt 24pt 36pt",
            width: '98.5%',
            paste_retain_style_properties: "all",
            paste_strip_class_attributes: "none",
            height: height,
            readonly: readonly,
            setup: function (editor) {
                editor.addButton('templateInsert', {
                    type: 'menubutton',
                    text: 'Insert Template',
                    icon: false,
                    menu: buildMenu(editor)
                });
            },
        });
    };
    function buildMenu(editor) {
        var menus = [{
                text: 'Thêm giá',
                onclick: function () {
                    editor.insertContent('[[Price]]');
                }
            },
            {
                text: 'Thêm hãng sản xuất',
                onclick: function () {
                    editor.insertContent('[[Manufacturer]]');
                }
            },
            {
                text: 'Thêm xuất xứ',
                onclick: function () {
                    editor.insertContent('[[Product_origin]]');
                }
            },
            {
                text: 'Thêm hạn sử dụng',
                onclick: function () {
                    editor.insertContent('[[Expried_date]]');
                }
            },
            {
                text: 'Thêm chú ý cho TPCN',
                onclick: function () {
                    editor.insertContent('<p style="text-align: justify;"><span style="font-size: 11pt; font-family: arial, helvetica, sans-serif;"><em><span style="font-size: 12pt;"><strong>Lưu ý</strong></span>:</em><em> Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh, hiệu quả sử dụng sản phẩm tùy thuộc cơ địa của từng người</em></span></p>');
                }
            },
            {
                text: 'Thêm chú ý cho Mom & Baby',
                onclick: function () {
                    editor.insertContent('<p style="text-align: justify;"><span style="font-size: 11pt; font-family: arial, helvetica, sans-serif;"><em><span style="font-size: 12pt;"><strong>Lưu ý</strong></span>:</em><em> Sản phẩm này là thức ăn bổ sung & được ăn thêm cùng với sữa mẹ cho trẻ trên 6 tháng tuổi</em></span></p>');
                }
            }
        ];
        if (typeof address != 'undefined' && address != null && address != '') {
            arrayAddress = JSON.parse(address);
            arrayAddress.forEach(function (item) {
                var menu = {
                    text: 'Thêm địa chỉ ' + item.key,
                    onclick: function () {
                        editor.insertContent('[[' + item.key + ']]');
                    }
                }
                menus.push(menu);
            });
        }
        return menus;
    }
    /**
     * show image when choose file image
     * @param {type} imputFile
     * @param {type} selectorShowImage
     * @returns {undefined}
     */
//    this.showImageWhenChooseFile = function (imputFile, selectorShowImage) {
//        if (input.files && input.files[0]) {
//            var reader = new FileReader();
//            reader.onload = function (e) {
//                $(selectorShowImage)
//                        .attr('src', e.target.result)
//            };
//            reader.readAsDataURL(input.files[0]);
//        }
//    };

    //this.initTinymce = function () {
    //    tinyMCE.init({
    //        selector: "#productContent",
    //        theme: "modern",
    //        plugins: "pagebreak table save charmap media contextmenu paste directionality noneditable visualchars nonbreaking spellchecker template image media code link table textcolor",
    //        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect styleselect formatselect | bullist numlist | undo redo | forecolor backcolor | charmap | link unlink | image media | table tablecontrols code",
    //
    //        contextmenu: "cut copy paste",
    //        menubar: false,
    //        //plugins : "safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
    //        theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
    //        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
    //        theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
    //        theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
    //        theme_advanced_toolbar_location : "top",
    //        theme_advanced_toolbar_align : "left",
    //        theme_advanced_statusbar_location : "bottom",
    //        theme_advanced_resizing : true,
    //        width: 800,
    //        height: 250,
    //
    //        /*Excel copy-paste Utility :Starts*/
    //        paste_retain_style_properties : "all",
    //        paste_strip_class_attributes : "none",
    //       //paste_remove_spans : true,
    //      /*Excel copy-paste Utility :Ends*/
    //        //Mad File Manager
    //
    //        relative_urls : false,
    //        file_browser_callback : this.madFileBrowser
    //    });
    //
    //};
    //
    //this.madFileBrowser = function (field_name, url, type, win) {
    //    tinyMCE.activeEditor.windowManager.open({
    //        file: "/system/news?field=" + field_name + "&url=" + url + "",
    //        title: "File Manager",
    //        width: 640,
    //        height: 450,
    //        resizable: "no",
    //        inline: "yes",
    //        close_previous: "no"
    //    }, {
    //        window: win,
    //        input: field_name
    //    });
    //    return false;
    //};

    //--------------------------------------------------------------------------
    //  Utils
    function getNumberValueParts(string) {
        var retVal = [];
        if (string == null) {
            return retVal;
        }
        //ELSE:
        var valueInString = string + "";
        if (valueInString.match(/[^0-9\,\.\s]/g) != null) {
            return retVal;
        }
        //ELSE:
        var stdValue = valueInString.replace(/[^0-9,]/g, "");
        if (stdValue == null || stdValue.length == 0) {
            return retVal;
        }
        var valueParts = stdValue.split(",");
        retVal = valueParts;
        valueParts.forEach(function (valuePart) {
            if (valuePart == null || valuePart.length == 0) {
                retVal = [];
            }
        });
        //return
        return retVal;
    }
    this.stringToField = function (string) {
        var strings = string.split("=");
        return {key: strings[0], value: strings[1]};
    }
    
    $scope.formatDate = function(stringDate){
        var date = new Date(stringDate);
        return (((date.getDate()+100)+'').substring(1,4)) + '/'
            + (((date.getMonth() + 101)+'').substring(1,4))
            + '/' +  date.getFullYear()
            + ' ' + date.getHours()
            + ':' + date.getMinutes()
            + ':' + date.getSeconds();
    }

}