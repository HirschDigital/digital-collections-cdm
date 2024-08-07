// get a reference to the current (active) document and store it in a variable named "doc"
doc = app.activeDocument;  

// change the color mode to RGB.  Important for resizing GIFs with indexed colors, to get better results
doc.changeMode(ChangeMode.RGB);  

// these are our values for the END RESULT width and height (in pixels) of our image
var fWidth = 10112;
var fHeight = 9250;

// do the resizing.  if height > width (portrait-mode) resize based on height.  otherwise, resize based on width
if (doc.height > doc.width) {
    doc.resizeImage(null,UnitValue(fHeight,"px"),null,ResampleMethod.BICUBIC);
}
else {
    doc.resizeImage(UnitValue(fWidth,"px"),null,null,ResampleMethod.BICUBIC);
}

// Makes the default background white
var white = new SolidColor(); 
white.rgb.hexValue = "FFFFFF";
app.backgroundColor = white;

// Convert the canvas size as informed above for the END RESULT
app.activeDocument.resizeCanvas(UnitValue(fWidth,"px"),UnitValue(fHeight,"px"));

doc.exportDocument(File(doc.path+'/'+resize),ExportType.SAVEFORWEB,options);