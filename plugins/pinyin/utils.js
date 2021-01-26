import toPinyin from "./toPinyin";

/**
 * 根据拼音首字母筛选排序分组
 * @param {Array} arr 原数组
 * @param {String} key 原数组需要筛选的字段
 * @returns {Array} 返回一个[{name: A,value: []}] 格式的二维数组
 */
export function getGroupByPinyin(arr, key = 'name') {
    if(!arr) return
    
    // 获取A-Z字母数组
    let keys = [...Array(26).keys()].map((i) => String.fromCharCode(i + 65));
    
    arr = arr.map((n) => ({
        ...n,
        py: toPinyin.chineseToInitials(
            toPinyin.chineseToPinYin(n[key].substr(0, 1))
        ),
    }));

    let group = [];
    for (const i of keys) {
        // 新数组一级结构，可自行修改
        let item = {
            name: i,
            value: [],
        };
        for (const j of arr) {
            if (j.py === i) {
                item.value.push(j);
            }
        }
        if (item.value.length > 0) {
            item.value.sort((a, b) => a[key].localeCompare(b[key]));
            group.push(item);
        }
    }
    return group;
}