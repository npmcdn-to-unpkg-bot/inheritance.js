import { extendObjectDef } from '../extend-object-def';



TypeError.extend = function(childDefAttrs) {
  return extendObjectDef(TypeError, childDefAttrs);
};
