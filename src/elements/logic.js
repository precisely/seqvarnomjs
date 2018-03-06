class LogicExpr {
  constructor(pattern) {
    this.pattern = pattern;
  }
}

export class OrExpr extends LogicExpr {
  constructor(lhs, rhs, pattern) {
    super(pattern);
    this.expressions = combineExpressions(lhs, rhs, OrExpr);
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('^');
  }
}

export class AndExpr extends LogicExpr {
  constructor(lhs, rhs, pattern) {
    super(pattern);
    this.expressions = combineExpressions(lhs, rhs, AndExpr);
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('&');
  }
}

export class NotExpr extends LogicExpr {
  constructor(expression, pattern) {
    super(pattern);
    this.expression = expression;
  }

  toString() {
    return `!${toStringGroupingLogic(this.expression)}`;
  }
}

/**
 * Returns a string representing the expression, adding group braces for logic exprs
 *
 * @param {any} x
 * @returns
 */
function toStringGroupingLogic(x) {
  if (x instanceof LogicExpr) {
    return `{${x.toString()}}`;
  } else  {
    return x.toString();
  }
}

/**
 * Returns true if this is a logic expression for the particular pattern type
 *
 * @export
 * @param {any} x
 * @param {any} pattern
 * @returns
 */
export function isLogicExpr(x, pattern) {
  return x instanceof LogicExpr && x.pattern === pattern;
}

/**
 * Combines expressions for the class type
 *
 * @param {any} lhs
 * @param {any} rhs
 * @param {any} cls
 * @returns Array
 */
function combineExpressions(lhs, rhs, cls) {
  debugger;
  if (lhs instanceof cls) {
    if (rhs instanceof cls) {
      return [...lhs.expressions, ...rhs.expressions];
    } else {
      return [...lhs.expressions, rhs];
    }
  } else {
    if (rhs instanceof cls) {
      return [lhs, ...rhs.expressions];
    } else {
      return [lhs, rhs];
    }
  }
}
