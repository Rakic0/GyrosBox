const split = (text: string | null) => {
  if (!text) {
    return {
      lines: [],
      words: [],
      letters: [],
    };
  }

  const lines = text.split(/\r?\n/);
  const words = text.match(/[\S\s]+?\S(?=\s|$)/g);
  const letters = text.split("");

  return {
    lines,
    words,
    letters,
  };
};

export default split;
