/* globals mix, deepMix */


// ------------------ //
// Static Functions   //
// ------------------ //

Object.extend = function(childDefAttrs) {
  return extendObjectDef(Object, childDefAttrs);
};



// ------------------ //
// Instance Functions //
// ------------------ //

Object.prototype.mix = function() {
  return mix(this, arguments);
};


Object.prototype.deepMix = function() {
  return deepMix(this, arguments);
};
