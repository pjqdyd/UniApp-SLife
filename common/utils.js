
const now = Date.now || function() {
	return new Date().getTime();
};

const concatArray = function(arr1, arr2){
	return arr1.concat(arr2);
}

export default {
	now,
	concatArray
}