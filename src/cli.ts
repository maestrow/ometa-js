import * as fs from "fs";
import { IMatchResult, Parser } from './parser'
import { Ast } from './grammar-ast'
import { math1 } from './grammars/math1'
import { ometa2lr, ometa2lrProj } from './grammars/ometa2lr'
import { TraceDiscovery } from "./utils/trace-discover";
import { IParserFn } from "types";
import * as equal from "fast-deep-equal/es6";
import { unfold } from "utils/unfold";

const printTrace = (p: Parser, input) => {
  const disco = new TraceDiscovery(p.grammar, input, p.trace.data)
  const trace = disco.convert()
  console.log(JSON.stringify(trace, null, 2))
}

const saveTrace = (p: Parser, input) => {
  const disco = new TraceDiscovery(p.grammar, input, p.trace.data)
  const trace = disco.convert()
  fs.writeFileSync("./dist/trace.json", JSON.stringify(trace, null, 2))  
}

const printRes = (p: Parser, res: IMatchResult) => {
  console.dir(r, {depth: null})
  // const trace = p.trace.data[p.trace.data.length-1]
  // console.log('root trace item:')
  // console.dir(trace, {depth:1})
}

const input = fs.readFileSync('src/grammars/ometa2lr.ometa', 'utf-8')
const p = new Parser(ometa2lr, ometa2lrProj)
const r = p.match(input as unknown as any[], 'ometa')
saveTrace(p, input)
printRes(p, r)

const isEqual = equal(ometa2lr, r.result)

console.log('\nDiff:\n')
console.log('isEqual: ' + isEqual)

fs.writeFileSync("./dist/diff_expected.json", JSON.stringify(ometa2lr, null, 2))
fs.writeFileSync("./dist/diff_actual.json", JSON.stringify(r.result, null, 2))




// const arr = ['seq', [
//   ['seq', [
//     ['wwed', [1, 2]], 
//     3,
//   ]], 
//   4,
// ]]
// const r = unfold(arr)
// console.log(JSON.stringify(arr))
// console.log(JSON.stringify(r))