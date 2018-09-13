import { SVN } from 'src/svn';
import {
  SequenceVariant, TransVariant, NARefAlt, Uncertain,
  UnphasedVariant, CisVariant, SimpleVariant, Location
} from 'src/elements';

describe('svn.ometa', function () {
  it('should read a simple nucleic acid variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.123123T>C', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('NC00001_1.11');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.pos).toEqual(123123);
    expect(result.variant.edit).toBeInstanceOf(NARefAlt);
    expect(result.variant.edit.ref).toEqual('T');
    expect(result.variant.edit.alt).toEqual('C');
  });

  it('should read a location', function () {
    const result = SVN.matchAll('NC00001_1.11:g.123123', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('NC00001_1.11');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.edit).toBeNull();
  });

  it('should read a nucleic acid variant with alternate accession type', function () {
    const result = SVN.matchAll('chr1.37p13:g.123123T>C', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('chr1.37p13');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.pos).toEqual(123123);
    expect(result.variant.edit).toBeInstanceOf(NARefAlt);
    expect(result.variant.edit.ref).toEqual('T');
    expect(result.variant.edit.alt).toEqual('C');
  });

  it('should read a simple variant with uncertain position', function () {
    const result = SVN.matchAll('NC00001_1.11:g.(123123)T>C', 'svnVariant');
    expect(result.variant.pos).toBeInstanceOf(Uncertain);
    expect(result.variant.pos.value).toEqual(123123);
  });

  it('should read a cis variant with a custom accession', function () {
    const result = SVN.matchAll('chr1:g.[123A>T]', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toBe('chr1');
  });

  it('should read a single cis variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.[123A>T]', 'svnVariant');
    expect(result.variant).toBeInstanceOf(CisVariant);
    expect(result.variant.variants).toHaveLength(1);
    const simpleVariant = result.variant.variants[0];
    expect(simpleVariant).toBeInstanceOf(SimpleVariant);
    expect(simpleVariant.pos).toEqual(123);
    expect(simpleVariant.edit.ref).toEqual('A');
    expect(simpleVariant.edit.alt).toEqual('T');
  });

  it('should read a wild-type variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.123123=', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('NC00001_1.11');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.pos).toEqual(123123);
    expect(result.variant.edit).toEqual('=');
  });

  context('when provided with a representation of a trans variant', function() {
    context('when it is a heterozygous trans variant', function () {
      let result;
      beforeEach(function () {
        result = SVN.matchAll('NC00001_1.11:g.[123123T>C];[123123=]', 'svnVariant');
      });

      it('should read a heterozygous variant as a TransVariant type', function () {
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.ac).toEqual('NC00001_1.11');
        expect(result.type).toEqual('g');
        expect(result.variant).toBeInstanceOf(TransVariant);
        expect(result.variant.variants).toHaveLength(2);
      });

      it('and the transvariant should contain two simple variants', function () {
        const [variant1,variant2] = result.variant.variants;
        expect(variant1).toBeInstanceOf(CisVariant);
        expect(variant2).toBeInstanceOf(CisVariant);
        expect(variant1.variants).toHaveLength(1);
        expect(variant2.variants).toHaveLength(1);
        const simpleVariant1 = variant1.variants[0];
        const simpleVariant2 = variant2.variants[0];
        expect(simpleVariant1.pos).toEqual(123123);
        expect(simpleVariant1.edit).toBeInstanceOf(NARefAlt);
        expect(simpleVariant1.edit.ref).toEqual('T');
        expect(simpleVariant1.edit.alt).toEqual('C');

        expect(simpleVariant2).toBeInstanceOf(SimpleVariant);
        expect(simpleVariant2.pos).toEqual(123123);
        expect(simpleVariant2.edit).toEqual('=');
      });
    });

    it('should read a wild type variant as a TransAllele type', function () {
      const result = SVN.matchAll('NC00001_1.11:g.[123123=];[123123=]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(TransVariant);
      expect(result.variant.variants).toHaveLength(2);
      const [cisVariant1, cisVariant2] = result.variant.variants;
      const variant1 = cisVariant1.variants[0];
      const variant2 = cisVariant2.variants[0];
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit).toEqual('=');
      expect(variant2.pos).toEqual(123123);
      expect(variant2.edit).toEqual('=');
    });

    it('should read a tri-allelic variant as a TransVariant type', function () {
      const result = SVN.matchAll('NC00001_1.11:g.[123123T>C];[123123T>G];[123123T>A]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(TransVariant);
      expect(result.variant.variants).toHaveLength(3);
      const [variant1, variant2,variant3] = result.variant.variants;
      expect(variant1.variants[0]).toBeInstanceOf(SimpleVariant);
      expect(variant1.variants[0].pos).toEqual(123123);
      expect(variant1.variants[0].edit.ref).toEqual('T');
      expect(variant1.variants[0].edit.alt).toEqual('C');
      expect(variant2.variants[0].edit.ref).toEqual('T');
      expect(variant2.variants[0].edit.alt).toEqual('G');
      expect(variant3.variants[0].edit.ref).toEqual('T');
      expect(variant3.variants[0].edit.alt).toEqual('A');
    });

    it('should read a variant with uncertain phases as an UnphasedVariant type', function () {
      const result = SVN.matchAll('NC00001_1.11:g.[123123T>C](;)[123123T>G](;)[123123T>A]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(UnphasedVariant);
      expect(result.variant.variants).toHaveLength(3);
      const [variant1, variant2, variant3] = result.variant.variants;
      expect(variant1.variants[0].pos).toEqual(123123);
      expect(variant1.variants[0].edit.ref).toEqual('T');
      expect(variant1.variants[0].edit.alt).toEqual('C');
      expect(variant2.variants[0].edit.ref).toEqual('T');
      expect(variant2.variants[0].edit.alt).toEqual('G');
      expect(variant3.variants[0].edit.ref).toEqual('T');
      expect(variant3.variants[0].edit.alt).toEqual('A');
    });

    context('parsing complex unphased variants with both cis and trans variants, the variant', function () {
      let result;
      beforeEach(function() {
        result = SVN.matchAll('NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]', 'svnVariant');
      });

      it('should be an UnphasedVariant containing three variants', function () {
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(UnphasedVariant);
        expect(result.variant.variants).toHaveLength(3);
        // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
        //                 1)^^^^^^^^^^^^^^^^^^^^^^^^^   2)^^^^^^^^^   3)^^^^^^^^^
      });

      context('with child variants', function () {
        let unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3;
        beforeEach(()=>{
          [unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3] = result.variant.variants;
        });

        it('the second unphased variant should be parsed correctly', function () {
          // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                               ^^^^^^^^
          expect(unphasedVariantChild2).toBeInstanceOf(CisVariant);
          expect(unphasedVariantChild2.type).toEqual('cis');
          expect(unphasedVariantChild2.variants[0].pos).toEqual(222);
          expect(unphasedVariantChild2.variants[0].edit.ref).toEqual('T');
          expect(unphasedVariantChild2.variants[0].edit.alt).toEqual('G');
        });

        it('the third unphased child variant is a single cis variant', function () {
          // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                                          ^^^^^^^^^
          expect(unphasedVariantChild3).toBeInstanceOf(CisVariant);
          expect(unphasedVariantChild3).toBeInstanceOf(CisVariant);
          expect(unphasedVariantChild3.variants[0].pos).toEqual(333);
          expect(unphasedVariantChild3.variants[0].edit.ref).toEqual('T');
          expect(unphasedVariantChild3.variants[0].edit.alt).toEqual('A');
        });


        context('the first unphased child variant variant', function () {
          it('should be a TransVariant', function () {
            // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
            //                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^
            expect(unphasedVariantChild1).toBeInstanceOf(TransVariant);
          });

          it('should contain two variants,', function () {
            expect(unphasedVariantChild1.variants).toHaveLength(2);
          });

          context('and those variants', function () {
            let transSingleVariant, transCisVariant;
            it('should be a Cis and Simple variant, respectively', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                 ^^^^^^^^^^^^^^^^^^ ^^^^^^^^

              [transCisVariant, transSingleVariant] = unphasedVariantChild1.variants;
              expect(transCisVariant).toBeInstanceOf(CisVariant);
              expect(transCisVariant.type).toEqual('cis');
              expect(transSingleVariant).toBeInstanceOf(CisVariant);
              expect(transSingleVariant.variants).toHaveLength(1);
            });

            it('where the first cis variant contains two SimpleVariants', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                  ^^^^^^^^^ ^^^^^^

              expect(transCisVariant.variants).toHaveLength(2);
              const [v1,v2] = transCisVariant.variants;
              expect(v1).toBeInstanceOf(SimpleVariant);
              expect(v2).toBeInstanceOf(SimpleVariant);

              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                  ^^^^^^^^^
              expect(v1.pos).toEqual(123123);
              expect(v1.edit.ref).toEqual('T');
              expect(v1.edit.alt).toEqual('C');

              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                            ^^^^^^
              expect(v2.pos).toEqual(999);
              expect(v2.edit.ref).toEqual('A');
              expect(v2.edit.alt).toEqual('G');
            });

            it('where the second cis variant contains one Simple Variant', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                                    ^^^^^^^^
              const transSimpleVariant = transSingleVariant.variants[0];
              expect(transSimpleVariant).toBeInstanceOf(SimpleVariant);
              expect(transSimpleVariant.pos).toEqual(444);
              expect(transSimpleVariant.edit.ref).toEqual('C');
              expect(transSimpleVariant.edit.alt).toEqual('T');
            });
          });
        });
      });
    });
  });

  context('cisVariant rule', function () {
    it('should parse [variant] as a SimpleVariant', function () {
      const cResult = SVN.matchAll('[123T>C]', 'cCisVariant');
      expect(cResult).toBeInstanceOf(CisVariant);

      const gResult = SVN.matchAll('[123T>C]', 'gCisVariant');
      expect(gResult).toBeInstanceOf(CisVariant);
    });

    it('should parse [variant;variant] as a CisVariant', function() {
      const cResult = SVN.matchAll('[123T>C;345A>G]', 'cCisVariant');
      expect(cResult).toBeInstanceOf(CisVariant);

      const gResult = SVN.matchAll('[123T>C;345A>G]', 'gCisVariant');
      expect(gResult).toBeInstanceOf(CisVariant);
    });
  });

});

describe('toString', function () {
  it('should stringify a simple nucleic acid variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.123123T>C', 'svnVariant');
    expect(result.toString()).toEqual('NC00001_1.11:g.123123T>C');
  });

  it('should stringify a simple variant with uncertain position', function () {
    const result = SVN.matchAll('NC00001_1.11:g.(123123)T>C', 'svnVariant');
    expect(result.toString()).toEqual('NC00001_1.11:g.(123123)T>C');
  });

  it('should stringify a wild-type variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.123123=', 'svnVariant');
    expect(result.toString()).toEqual('NC00001_1.11:g.123123=');
  });

  it('should stringify a cis variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.[123123=]', 'svnVariant');
    expect(result.toString()).toEqual('NC00001_1.11:g.[123123=]');
  });

  it('should stringify an unphased variant', function () {
    const result = SVN.matchAll('NC00001_1.11:g.[123123T>C](;)[123123=]', 'svnVariant');
    expect(result.toString()).toEqual('NC00001_1.11:g.[123123T>C](;)[123123=]');
  });
});
