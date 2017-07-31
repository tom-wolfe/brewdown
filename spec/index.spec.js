describe("Console", () => {
  describe("log", () => {
    it("should work", () => {
      expect(() => { console.log("face!"); }).not.toThrow();
    });
  });
});