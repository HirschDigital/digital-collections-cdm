//A script loader that will inject our JS into the HTML header
function ScriptLoader(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
        script.onload = function(){
            callback();
        };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


//We only want this code to run on our timeline page
document.addEventListener('cdm-custom-page:ready', function(event) {
    if (event.detail.filename.endsWith('timeline')) {
        //inject the axios library for HTTP requests
        ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
            document.getElementById('timeline-embed').innerHTML = "<h1>Hello World!</h1>"
        });
    }
});