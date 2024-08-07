Canvas_Bigger ();
function Canvas_Bigger() {
var srcDoc = app.activeDocument;
var nme = srcDoc.layers[srcDoc.layers.length-1].name;
if (nme != "Big Canvas") {

    // get original width and height
    var w = srcDoc.width.value;
    var h = srcDoc.height.value;

    // Increase canvas size + 211 pixels to the right
    // with the anchor in the top left
    srcDoc.resizeCanvas(w /*+211*/, h, AnchorPosition.TOPLEFT);
    srcDoc.layers[srcDoc.layers.length-1].name = "Big Canvas";
    //alert ("Canvas was changed");
    } else {
    //alert ("Script was already used");
    }
}