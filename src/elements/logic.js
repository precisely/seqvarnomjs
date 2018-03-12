export class LogicExpr {
}

class OpExpr {
  constructor(expressions) {
    this.expressions = expressions;
  }
}

export class OrExpr extends OpExpr {
  constructor(lhs, rhs) {
    super();
    this.expressions = combineExpressions(lhs, rhs, OrExpr);
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('^');
  }
}

export class AndExpr extends OpExpr {
  constructor(lhs, rhs) {
    super();
    this.expressions = combineExpressions(lhs, rhs, AndExpr);
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('&');
  }
}

export class NotExpr extends OpExpr {
  constructor(expression) {
    super();
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
  if (x instanceof OpExpr) {
    return `{${x.toString()}}`;
  } else  {
    return x.toString();
  }
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


/**
 * A variant inside a SequenceVariant
 * @export
 * @class SubSequenceVariant
 */
export class SubSequenceVariant {}

/**
 * Returns a LogicExpr object
 * @export
 * @param {String} op
 * @param {LogicExpr|Variant} lhs
 * @param {any} rhs
 * @returns LogicExpr
 */
export function binaryOperator(op, lhs, rhs) {
  switch (op) {
    case '&': return new AndExpr(lhs, rhs);
    case '^': return new OrExpr(lhs, rhs);
    default: throw new Error(`Invalid expression: ${lhs.toString()}${op}${rhs.toString()}`);
  }
}
