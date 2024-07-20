declare module "*/rust_lib.js" {
  export function add(a: number, b: number): number;
  export function fibonacci(n: number): number;
  export default function init(): Promise<void>;
}
