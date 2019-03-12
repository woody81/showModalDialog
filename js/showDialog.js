function showDialog(url, arg, opt) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'dialogWidth:300px;dialogHeight:200px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
        var caller = showDialog.caller.toString();

        var close = function () {
            iframe.remove();
            content.remove();
            cover.remove();
        };

        var cover = $('<div>').addClass('cover').appendTo(document.body);
        var content = $('<div>').addClass('dialog').css({
            width: opt.width || '50%',
            height: opt.height || '50%',
            left: opt.left || '25%',
            top: opt.top || '25%',
            display: 'none'
        })
        .appendTo(document.body);

        var iframe = $('<iframe>').appendTo(content).attr({
                "src": url,
                "id": "modal-iframe"}).on("load", function () {
            content.css({ display: 'block' });
        });

        $('<input>').appendTo(content).attr({
            "type": "button",
            "id": "dialog-close",
            "onclick": "_done(form);",
            "value": "close"});

        $('#dialog-close').on('click',function(e) {
            e.preventDefault();
        });

        //if using eval
        var isNext = false;
        var nextStmts = caller.split('\n').filter(function(stmt) {
            if(isNext || stmt.indexOf('showDialog(') >= 0)
                return isNext = true;
            return false;
        });
        $('#dialog-close').on('click', function () {
            var returnValue = document.getElementById('modal-iframe').contentWindow.returnValue;
            close();
            nextStmts[0] = nextStmts[0].replace(/(window\.)?showDialog\(.*\)/g, JSON.stringify(returnValue));
            eval('{\n' + nextStmts.join('\n'));
        });
        throw 'Execution stopped until showModalDialog is closed';
    };
// })();