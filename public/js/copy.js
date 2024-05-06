async function copyToClipboard(text) {

    // resolve the element
    // el = (typeof el === 'string') ? document.querySelector(el) : el;

    // // handle iOS as a special case
    // if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

    //     // save current contentEditable/readOnly status
    //     var editable = el.contentEditable;
    //     var readOnly = el.readOnly;

    //     // convert to editable with readonly to stop iOS keyboard opening
    //     el.contentEditable = true;
    //     el.readOnly = true;

    //     // create a selectable range
    //     var range = document.createRange();
    //     range.selectNodeContents(el);

    //     // select the range
    //     var selection = window.getSelection();
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    //     el.setSelectionRange(0, 999999);

    //     // restore contentEditable/readOnly to original state
    //     el.contentEditable = editable;
    //     el.readOnly = readOnly;
    // }
    // else {
    //     el.select();
    // }
    const input = document.createElement('input')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    //alert(text)
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        alert(error.message);
    }
}

var fee_info = "具体费用就是出发地到机场最快路程的距离✖️2加上5，需要minivan的话再加5。然后从Lakemont出发 距离出发地(接机的话是目的地)6 miles以内免接程费，超出部分每miles收0.5接的费用。接送费用目前相同"
