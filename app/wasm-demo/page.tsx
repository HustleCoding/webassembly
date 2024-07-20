"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WasmDemo = () => {
  const [wasmModule, setWasmModule] = useState<any>(null);
  const [sum, setSum] = useState<number | null>(null);
  const [fibResult, setFibResult] = useState<number | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasm = await import("../../wasm/rust_lib");
        await wasm.default();
        setWasmModule(wasm);
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
