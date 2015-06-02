import { extendObjectDef } from '../extend-object-def';



Float32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Float32Array, childDefAttrs);
};
