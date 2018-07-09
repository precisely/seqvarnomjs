import { VariantGraph } from '../../src/elements/variant-graph';

describe('VariantGraph', function () {
  describe('addVariants', function () {

    describe('given a single variant,', function () {
      const vg = new VariantGraph();
      beforeAll(() => vg.addVariants(['a'], 'foo'));

      it('should produce a matrix with one unconnected node', function () {
        expect(vg.adjacencyMatrix).toEqual([[0]]);
      });

      it('should have a single node', function () {
        expect(vg.nodes).toEqual(['a']);
      });

      it('should have a valid variantIndexes property (containing an index to the variant)', function () {
        expect(vg.variantIndexes).toEqual([0]);
      });
    });

    describe('given two variants', function () {
      const vg = new VariantGraph();
      beforeAll(() => vg.addVariants(['a', 'b'], 'foo'));

      it('should have three nodes, two variants and an edge', function () {
        expect(vg.nodes).toEqual(['a','b','foo']);
      });

      it('should have valid variantIndexes property', function () {
        expect(vg.variantIndexes).toEqual([0,1]); // representing nodes a and b
      });

      it('should produce a matrix connecting the two variants via the edge', function () {
        // note: this test is a bit brittle; it will fail if the algorithm changes
        expect(vg.adjacencyMatrix).toEqual([
          [0, 0, 1], // a -> foo
          [0, 0, 1], // b -> foo
          [1, 1, 0] //  foo -> a, b
        ]);
      });

    });

    describe('when a variant is added to two existing variants,', function () {
      const vg = new VariantGraph();
      beforeAll(() => {
        vg.addVariants(['a', 'b'], 'foo');
        vg.addVariants(['c'], 'bar');
      });

      it('should add three nodes, the new variant and two new edges', function () {
        expect(vg.nodes).toEqual(['a','b','foo','c','bar','bar']);
      });

      it('should connect the new variant to each of the previous nodes', function () {
        expect(vg.adjacencyMatrix).toEqual([
          [0,0,1,0,1,0], // a -> foo,bar
          [0,0,1,0,0,1], // b -> foo,bar
          [1,1,0,0,0,0], // foo -> a,b
          [0,0,0,0,1,1], // c -> bar,bar
          [1,0,0,1,0,0], // bar -> a,c
          [0,1,0,1,0,0]  // bar -> b,c
        ]);
      });
    });

    describe('when three variants are added to two existing variants,', function () {
      const vg = new VariantGraph();
      beforeAll(() => {
        vg.addVariants(['a', 'b'], 'foo');
        vg.addVariants(['c','d','e'], 'bar');
      });

      it('should add three nodes, the new variant and two new edges', function () {
        expect(vg.nodes).toEqual([
          'a','b','foo', // a connected to b via foo
          'c','d','e','bar','bar','bar', // c,d,e connected to each other via bar
          'bar','bar','bar','bar','bar','bar']); // c,d,e each connected to a and b
      });

      it('should connect the new variant to each of the previous nodes', function () {
        const m = vg.adjacencyMatrix;
        expect(m).toHaveLength(15);
        expect(m.every(row => row.length ===15)).toBeTruthy();
        // a connectivity - edges:
        expect(vg.connectedIndexes(0,1).map(i => vg.nodes[i])).toEqual([
          'foo', 'bar', 'bar', 'bar'
        ]);
        // a connectivity - other variants:
        expect(vg.connectedIndexes(0,2).map(i => vg.nodes[i]).filter(v => v!=='a')).toEqual([
          'b', 'c', 'd', 'e'
        ]);
        // b connectivity - edges:
        expect(vg.connectedIndexes(1,1).map(i => vg.nodes[i])).toEqual([
          'foo', 'bar', 'bar', 'bar'
        ]);
        // b connectivity - other variants:
        expect(vg.connectedIndexes(1,2).map(i => vg.nodes[i]).filter(v => v!== 'b')).toEqual([
          'a', 'c', 'd', 'e'
        ]);
        // c connectivity - edges (2 to d,e, 2 to a,b):
        expect(vg.connectedIndexes(3,1).map(i => vg.nodes[i])).toEqual([
          'bar','bar','bar','bar'
        ]);
        // c connectivity - other variants:
        expect(vg.connectedIndexes(3,2).map(i => vg.nodes[i]).filter(v => v!=='c')).toEqual([
          'd', 'e', 'a','b'
        ]);

      });
    });
  });
});
