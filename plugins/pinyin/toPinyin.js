/*
 * @Autor: lieft@qq.com
 * @Date: 1970-01-01 08:00:00
 * @LastEditors: hlb
 * @LastEditTime: 2020-11-25 17:48:41
 * @description: 转拼音 
 */
import pinyin from "./pinyin";

class ToPinyin {
    static instance;

    constructor() {

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ToPinyin();
        }
        return this.instance;
    }

    // 转首字母 this.chineseToInitials(this.chineseToPinYin('你好'))  this.chineseToInitials('NiHao')
    chineseToInitials(word){
        let SX = '';
        for (var i = 0; i < word.length; i++) {
          var c = word.charAt(i);
          if (/^[A-Z]+$/.test(c)) {
             SX += c;
          }
        }
        return SX
    }

    // 转拼音
    chineseToPinYin(l1) {
        var l2 = l1.length;
        var I1 = '';
        var reg = new RegExp('[a-zA-Z0-9]');
        for (var i = 0; i < l2; i++) {
            var val = l1.substr(i, 1);
            var name = this.arraySearch(val, pinyin);
            if (reg.test(val)) {
                I1 += val;
            } else if (name !== false) {
                I1 += name;
            }
        }
        I1 = I1.replace(/ /g, '-');
        while (I1.indexOf('--') > 0) {
            I1 = I1.replace('--', '-');
        }
        return I1;
    }

    arraySearch(l1, l2) {
        for (var name in pinyin) {
            if (pinyin[name].indexOf(l1) !== -1) {
                return this.ucfirst(name);
            }
        }
        return false;
    }

    ucfirst(l1) {
        if (l1.length > 0) {
            var first = l1.substr(0, 1).toUpperCase();
            var spare = l1.substr(1, l1.length);
            return first + spare;
        }
    }
   

}
const toPinyin = ToPinyin.getInstance()
export default toPinyin;