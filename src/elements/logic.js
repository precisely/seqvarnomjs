class LogicExpr {
  constructor(pattern) {
    this.pattern = pattern;
  }
}

export class OrExpr extends LogicExpr {
  constructor(expressions, pattern) {
    super(pattern);
    this.expressions = expressions;
  }
}

export class AndExpr extends LogicExpr {
  constructor(expressions, pattern) {
    super(pattern);
    this.expressions = expressions;
  }
}

export class NotExpr extends LogicExpr {
  constructor(expression, pattern) {
    super(pattern);
    this.expression = expression;
  }
}

export function isLogicExpr(x, pattern) {
  return x instanceof LogicExpr && x.pattern === pattern;
}
