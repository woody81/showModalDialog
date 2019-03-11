(function() {
    window.showModalDialog = window.showModalDialog || function(url, arg, opt) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'dialogWidth:300px;dialogHeight:200px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles

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
            "value": "close"});

        $('#dialog-close').on('click',function(e) {
            e.preventDefault();
        });

        return new Promise(function(resolve, reject) {
            // document.getElementsByTagName('input')[0].addEventListener('click', function() {
            $('#dialog-close').on('click', function () {
                // $(this).contents().find("input").on("close", function() {
                // var returnValue = document.getElementById('modal-iframe').contentWindow.returnValue;
                var returnValue = document.getElementById('modal-iframe').contentWindow.returnValue;
                close();
                // document.body.removeChild(dialog);
                resolve(returnValue);
            });
        });
        throw 'Execution stopped until showModalDialog is closed';
    };
})();