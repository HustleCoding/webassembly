"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface WasmModule {
  add: (a: number, b: number) => number;
  fibonacci: (n: number) => number;
}

const WasmDemo = () => {
  const [wasmModule, setWasmModule] = useState<WasmModule | null>(null);
  const [sum, setSum] = useState<number | null>(null);
  const [fibResult, setFibResult] = useState<number | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasmModule = await import("@/wasm/rust_lib");
        await wasmModule.default();
        setWasmModule(wasmModule as unknown as WasmModule);
      } catch (err) {
        console.error("Failed to load WASM module", err);
      }
    };

    loadWasm();
  }, []);

  const handleAdd = () => {
    if (wasmModule) {
      const result = wasmModule.add(5, 3);
      setSum(result);
    }
  };

  const handleFibonacci = () => {
    if (wasmModule) {
      const result = wasmModule.fibonacci(10);
      setFibResult(result);
    }
  };

  return (
    <div>
      <h1>WebAssembly Demo</h1>
      <button onClick={handleAdd}>Add 5 + 3</button>
      {sum !== null && <p>Sum: {sum}</p>}
      <button onClick={handleFibonacci}>Calculate Fibonacci(10)</button>
      {fibResult !== null && <p>Fibonacci(10): {fibResult}</p>}
    </div>
  );
};

export default dynamic(() => Promise.resolve(WasmDemo), {
  ssr: false,
});
