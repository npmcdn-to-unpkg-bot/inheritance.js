import { extendObjectDef } from '../extend-object-def';



Map.extend = function(childDefAttrs) {
  return extendObjectDef(Map, childDefAttrs);
};
