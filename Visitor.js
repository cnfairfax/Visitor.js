var Visitor = {
    data : {
        contact : {},
        lead : {}
    },
    write : function() {
        Visitor.fetch();
        var inputs = jQuery('.dynamo-form input');

        Visitor.update(inputs);

        var cookieString = JSON.stringify(Visitor.data);
        // Set expiration date
        var d = new Date();
        d.setTime(d.getTime() + (7776000000));
        var expires = "expires=" + d.toUTCString();
        // write the cookie
        document.cookie = 'Visitor=' + cookieString + ';' + expires + ';path=/';
    },
    render : function() {
        Visitor.fetch();
        var valueFields = jQuery('dyco');
        valueFields.each(function(i){
            var dynamo = jQuery(this).attr('data-dy-name');
            if(Visitor.data[dynamo]) {
                jQuery(this).text(Visitor.data[dynamo].value);
            }
        });
    },
    fetch : function() {
        vString = Visitor.getVCookie('Visitor');

        if (vString != '') {
            Visitor.data = JSON.parse(vString);
        }
    },
    update : function(inputs) {
        for(i = 0; i < inputs.length; i++){
            // Check to see if the input name exists in the array ecludedInputs
            // indexOf() returns -1 when the value has no index in the array
            // Only write values if they are NOT in the array excludedInputs
            var exclude = inputs[i].attributes['data-dy-exclude'] ? inputs[i].attributes['data-dy-exclude'].value.toUpperCase() : 'NO';
            var excluded = false;
            if(exclude.indexOf('Y') == 0){
                excluded = true;
            }
            if(!excluded) {
                    // Check to see if an input has at least a leadfield or contactfield attribute
                if(inputs[i].attributes['data-dy-name']){
                    var dycoName = inputs[i].attributes['data-dy-name'].value;
                    Visitor.data[dycoName] = new vAttribute(inputs[i]);
                } else {
                    Visitor.data[inputs[i].name] = new vAttribute(inputs[i]);
                }
            }
        }
    },
    getVCookie : function(cookname) {
        var name = cookname + "=";
        // pull all cookies in a decoded format
        var decodedCookie = decodeURIComponent(document.cookie);
        // split cookies into individual cookies
        var ca = decodedCookie.split(';');
        var cString = '';
        // cycle through cookies looking for cookie that begins w/ name
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            // trim leading spaces
            c = c.trim();
            // if cookie found, set cString to cookie value
            if (c.indexOf(name) == 0) {
                cString = c.substring(name.length, c.length);
            }
        }
        return cString;
    }
}

function vAttribute(input) {
    if(input.attributes['data-dy-name']) {
        this.name = inputs[i].attributes['data-dy-name'];
    } else {
        this.name = input.name;
    }
    if(input.type = 'select-one') {
        this.valueLabel = input.innerHTML ? input.querySelector('option[value="' + input.value + '"]').textContent : input.valueLabel;
    }
    this.type = input.type;
    this.value = input.value;
}

vAttribute.prototype.render = function(element) {
    if(this.type == 'select-one') {
        element.textContent = this.valueLabel;
    } else {
        element.textContent = this.value;
    }
}

window.onload = function() {
    document.addEventListener('DOMContentLoaded',function(){
        Visitor.render();
        var form = document.querySelector('.dynamo-form form');
        form.addEventListener('submit', function(){
            Visitor.write();
        });
    });
}
