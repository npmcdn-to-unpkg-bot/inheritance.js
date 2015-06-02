import { extendObjectDef } from '../extend-object-def';



URIError.extend = function(childDefAttrs) {
  return extendObjectDef(URIError, childDefAttrs);
};
