import { extendObjectDef } from '../extend-object-def';



Promise.extend = function(childDefAttrs) {
  return extendObjectDef(Promise, childDefAttrs);
};
