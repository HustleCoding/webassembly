"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WasmDemo = () => {
  const [wasmModule, setWasmModule] = useState<
    typeof import("@/wasm/rust_lib") | null
  >(null);
  const [sum, setSum] = useState<number | null>(null);
  const [fibResult, setFibResult] = useState<number | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasmModule = await import("../../rust-lib/pkg/rust_lib");
        await wasmModule.default();
        setWasmModule(
          wasmModule as unknown as typeof import("@/wasm/rust_lib")
        );
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">WebAssembly Demo</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleAdd}
      >
        Add 5 + 3
      </button>
      {sum !== null && <p className="mt-2">Sum: {sum}</p>}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleFibonacci}
      >
        Calculate Fibonacci(10)
      </button>
      {fibResult !== null && <p className="mt-2">Fibonacci(10): {fibResult}</p>}
    </div>
  );
};

export default dynamic(() => Promise.resolve(WasmDemo), {
  ssr: false,
});
