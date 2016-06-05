
function crop(image,width,height){ 
  var output= new SimpleImage(width,height);
  for(var outputPixel of output.values()){ 
  	var x=outputPixel.getX();
    var y=outputPixel.getY();
    var px= image.getPixel(x,y);
    outputPixel.setRed(px.getRed());
    outputPixel.setGreen(px.getGreen());
    outputPixel.setBlue(px.getBlue());
  }
  return output;
}

function reducePixel(pixel,bit){
    var intBit = Math.floor(pixel/bit)*bit;
    return intBit;
}

function chop2hideImg(image,bit){
    bit = bitToUse(bit);
    for(var px of image.values()){
        px.setRed(reducePixel
        (px.getRed(),bit));
        px.setGreen(reducePixel
        (px.getGreen(),bit));
        px.setBlue(reducePixel
        (px.getBlue(),bit));
    }
    return image;
}

function shift(image,bit){
    bit=bitToUse(bit);
  var SimpImg= new SimpleImage(image.getWidth(), image.getHeight());
  for(var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    var newPix = SimpImg.getPixel(x,y);

    newPix.setRed(Math.floor(px.getRed()/bit));
    newPix.setGreen(Math.floor(px.getGreen()/bit));
    newPix.setBlue(Math.floor(px.getBlue()/bit));
  }
  return SimpImg;
}

function combine(startImg,hideImg){
var combinedImage = new SimpleImage(startImg.getWidth(),startImg.getHeight());
for(var combinePixel of combinedImage.values()){
    x=combinePixel.getX();
    y=combinePixel.getY();
    startImgPx=startImg.getPixel(x,y);
    hideImgPx=hideImg.getPixel(x,y); 
    combinePixel.setRed(startImgPx.getRed()+hideImgPx.getRed());
    combinePixel.setGreen(startImgPx.getGreen()+hideImgPx.getGreen());
    combinePixel.setBlue(startImgPx.getBlue()+hideImgPx.getBlue());
    }
return combinedImage;
}

function decode(image,bit){
    bit = bitToUse(bit);
    var newImg = new SimpleImage(image.getWidth(),image.getHeight());
        for(var px of image.values()){
            var x = px.getX();
            var y = px.getY();
            var newPix = newImg.getPixel(x,y);
            newPix.setRed(bit*(px.getRed()-(bit*Math.floor(px.getRed()/bit)))); 
            newPix.setGreen(bit*(px.getGreen()-(bit*Math.floor(px.getGreen()/bit))));
            newPix.setBlue(bit*(px.getBlue()-(bit*Math.floor(px.getBlue()/bit))));
            
        }
return newImg;
}

function bitToUse(bit){
    result = Math.pow(2,bit);
    return result;
}
///////////////////////////////////////////////////////////////////

var ShowImage= new SimpleImage("rsz_1lambo2.jpg"); //image to show goes here
var hideImgImage= new SimpleImage("rsz_lambo1.jpg"); //image to hide goes here
var bit = 4; //change bits should you so desire. Higher = better quality. 

var cropWidth=Math.min(ShowImage.getWidth(),hideImgImage.getWidth());
var cropHeight=Math.min(ShowImage.getHeight(),hideImgImage.getHeight());
var cropShowImage= crop(ShowImage,cropWidth,cropHeight);
var cropHiddenImage= crop(hideImgImage,cropWidth,cropHeight);


startImg = chop2hideImg(cropShowImage,bit);
hideImg = shift(cropHiddenImage,bit);
combiend = combine(startImg,hideImg);
decoded = decode(combined,bit);

print(ShowImage);
print(hideImgImage);
print(combined);
print(decoded);
