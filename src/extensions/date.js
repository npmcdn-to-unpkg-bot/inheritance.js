import { extendObjectDef } from '../extend-object-def';



Date.extend = function(childDefAttrs) {
  return extendObjectDef(Date, childDefAttrs);
};
