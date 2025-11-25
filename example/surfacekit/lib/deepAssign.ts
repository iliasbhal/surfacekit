export function deepAssign(target: Record<string, any>, ...sources: Record<string, any>[]) {
  if (!sources.length) return target;

  for (const source of sources) {
    if (!source) continue;

    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          deepAssign(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    }
  }

  return target;
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}