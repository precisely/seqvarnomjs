export class LogicExpr {
  constructor(pattern) {
    this.pattern = pattern;
  }
}

class OpExpr {
  constructor(expressions) {
    this.expressions = expressions;
  }
}

export class OrExpr extends OpExpr {
  constructor(lhs, rhs, subclass) {
    super(subclass);
    this.expressions = combineExpressions(lhs, rhs, OrExpr);
    this.subclass = subclass;
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('^');
  }
}

export class AndExpr extends OpExpr {
  constructor(lhs, rhs, subclass) {
    super(subclass);
    this.expressions = combineExpressions(lhs, rhs, AndExpr);
    this.subclass = subclass;
  }

  toString() {
    return this.expressions.map(e=>toStringGroupingLogic(e)).join('&');
  }
}

export class NotExpr extends OpExpr {
  constructor(expression, subclass) {
    super(exprSubclass(expression));
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
  var lhsSubclass = exprSubclass(lhs);
  var rhsSubclass = exprSubclass(rhs);
  if (lhsSubclass !== rhsSubclass) {
    throw new Error(`Can't combine "${lhs.toString()}" and "${rhs.toString()}" using ${op}`);
  }

  switch (op) {
    case '&': return new AndExpr(lhs, rhs, lhsSubclass);
    case '^': return new OrExpr(lhs, rhs, lhsSubclass);
    default: throw new Error(`Invalid expression: ${lhs.toString()}${op}${rhs.toString()}`);
  }
}

function exprSubclass(expr) {
  return;
  if (expr instanceof SubSequenceVariant) {
    return SubSequenceVariant;
  } else if (expr instanceof OpExpr) {
    return expr.subclass;
  } if (expr instanceof SequenceVariant) {
    return SequenceVariant;
  }
}


////////////////////////////////////////////////////////////////////
// Checks for logic consistency

function checkLogic(expr, predicate) {
  if (expr instanceof AndExpr || expr instanceof OrExpr) {

  }
}
