import { extendObjectDef } from '../extend-object-def';



RangeError.extend = function(childDefAttrs) {
  return extendObjectDef(RangeError, childDefAttrs);
};
