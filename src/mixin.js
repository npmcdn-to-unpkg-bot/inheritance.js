export default function mixin({ props, mixins }) {
  if (typeof arguments[0] === 'object') {
    props = arguments[0];
  }

  let ret;

  if (Array.isArray(mixins)) {
    mixins = Array.from(mixins);

    let mixinParent = mixins.splice(0, 1)[0];

    mixins.forEach(mixin => {
      mixinParent = mixin(mixinParent);
    });

    ret = (parent => class extends mixinParent(parent) {});
  } else {
    ret = (parent => class extends parent {});
  }

  Object.assign(ret.prototype, props);

  return ret;
}
