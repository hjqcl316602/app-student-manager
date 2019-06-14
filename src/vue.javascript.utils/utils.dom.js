function imgLoadProp(e){
  let  parentNode = e.target.parentNode || e.target.parentElement ;
  let imgBoxWidth = parentNode.offsetWidth;
  let imgBoxHeight = parentNode.offsetHeight;
  let imgHeight = e.target.height;
  let imgWidth = e.target.width;
  let imgBoxProp = imgBoxWidth / imgBoxHeight;
  let imgProp = imgWidth / imgHeight;
  if(imgProp >= imgBoxProp ){
    e.target.style.height = imgBoxHeight + 'px';
  }else{
    e.target.style.width = imgBoxWidth + 'px';
  }
}
export {
  imgLoadProp
}
