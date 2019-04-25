
const now = Date.now || function() {
	return new Date().getTime();
};

const concatArray = function(arr1, arr2){
	return arr1.concat(arr2);
}

//计算两个经纬度之间的距离
const getDistance = function( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
	
	if(s >= 1){
	  return s.toFixed(2) + "千米"; //保留两位小数,返回单位千米
	}

    return (s*1000).toFixed(0) + "米"; //不保留小数, 返回单位米
}

export default {
	now,
	concatArray,
	getDistance
}