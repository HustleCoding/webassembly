declare module "@/wasm/rust_lib" {
  export function add(a: number, b: number): number;
  export function fibonacci(n: number): number;
  export default function init(): Promise<void>;
}
