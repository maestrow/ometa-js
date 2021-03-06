import { Ast } from "./grammar-ast";

export const getRuleBodyByName = (name: string, grammar: Ast.GenericGrammar): Ast.GenericExpr => {
  const g = grammar.find(i => i[0] === name)
  if (g === undefined) {
    throw new Error(`Cannot find rule: ${name}`);
    
  }
  return g[1]
}