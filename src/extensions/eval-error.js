import { extendObjectDef } from '../extend-object-def';



EvalError.extend = function(childDefAttrs) {
  return extendObjectDef(EvalError, childDefAttrs);
};
