import { extendObjectDef } from '../extend-object-def';



ArrayBuffer.extend = function(childDefAttrs) {
  return extendObjectDef(ArrayBuffer, childDefAttrs);
};
