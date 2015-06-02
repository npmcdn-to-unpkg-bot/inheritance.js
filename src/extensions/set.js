import { extendObjectDef } from '../extend-object-def';



Set.extend = function(childDefAttrs) {
  return extendObjectDef(Set, childDefAttrs);
};
