// Fixed for bundled functions that may not have parentheses
var ARGUMENT_NAMES = /([^,]*)/g;

export function getFnParamInfo(fn):Map<string, any>{
    var fstr = fn.toString();
    const openPar = fstr.indexOf("(");
    const closePar = fstr.indexOf(")");
    const getFirstBracket = (str, offset = 0) => {
      const fb = offset + str.indexOf("{");
      if (fb < closePar && fb > openPar) {
        return getFirstBracket(str.slice(fb), offset + fb);
      } else
        return fb;
    };
    const firstBracket = getFirstBracket(fstr);
    let innerMatch;
    if (firstBracket === -1 || closePar < firstBracket)
      innerMatch = fstr.slice(fstr.indexOf("(") + 1, fstr.indexOf(")"));
    else
      innerMatch = fstr.match(/([a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\)) =>/)?.[1];

    if(!innerMatch) 
        return undefined;

    const matches = innerMatch.match(ARGUMENT_NAMES).filter((e) => !!e);

    const info = new Map()
    matches.forEach(v => {
        let [name, value] = v.split('=')
        name = name.trim()
        name = name.replace(/\d+$/, ""); // Account for bundling. RULE: No trailing numbers in argument names

        try {
            if (name) info.set(name,  (0, eval)(`(${value})`))
        } catch (e) {
            info.set(name,  undefined)
            console.warn(`Argument ${name} could be parsed for`, fn.toString());
        }
    })

    return info
}