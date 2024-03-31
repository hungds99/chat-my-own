export function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

const decoder = new TextDecoder();

// readChunks() reads from the provided reader and yields the results into an async iterable
export function readChunks(reader: any) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield decoder.decode(readResult.value);
        readResult = await reader.read();
      }
    },
  };
}
