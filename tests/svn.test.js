import { SVN } from 'src/svn';
import { SequenceVariant, TransVariant, NARefAlt } from 'src/elements';
import { UnphasedVariant, CisVariant, SimpleVariant, SequenceVariantPattern, OrExpr, AndExpr, NotExpr } from '../src/elements';

describe('svn.ometa', function () {
  it('should read a simple nucleic acid variant', function () {
    var result = SVN.matchAll('NC00001_1.11:g.123123T>C', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('NC00001_1.11');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.pos).toEqual(123123);
    expect(result.variant.edit).toBeInstanceOf(NARefAlt);
    expect(result.variant.edit.ref).toEqual('T');
    expect(result.variant.edit.alt).toEqual('C');
  });

  it('should read a wild-type variant', function () {
    var result = SVN.matchAll('NC00001_1.11:g.123123=', 'svnVariant');
    expect(result).toBeInstanceOf(SequenceVariant);
    expect(result.ac).toEqual('NC00001_1.11');
    expect(result.type).toEqual('g');
    expect(result.variant).toBeInstanceOf(SimpleVariant);
    expect(result.variant.pos).toEqual(123123);
    expect(result.variant.edit).toBeNull();
  });

  context('when provided with a representation of a trans variant', function() {
    context('when it is a heterozygous trans variant', function () {
      var result;
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
        var [variant1,variant2] = result.variant.variants;
        expect(variant1).toBeInstanceOf(SimpleVariant);
        expect(variant2).toBeInstanceOf(SimpleVariant);
        expect(variant1.pos).toEqual(123123);
        expect(variant1.edit).toBeInstanceOf(NARefAlt);
        expect(variant1.edit.ref).toEqual('T');
        expect(variant1.edit.alt).toEqual('C');

        expect(variant2).toBeInstanceOf(SimpleVariant);
        expect(variant2.pos).toEqual(123123);
        expect(variant2.edit).toBeNull();
      });
    });

    it('should read a wild type variant as a TransAllele type', function () {
      var result = SVN.matchAll('NC00001_1.11:g.[123123=];[123123=]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(TransVariant);
      expect(result.variant.variants).toHaveLength(2);
      var [variant1, variant2] = result.variant.variants;
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit).toBeNull();
      expect(variant2.pos).toEqual(123123);
      expect(variant2.edit).toBeNull();
    });

    it('should read a tri-allelic variant as a TransVariant type', function () {
      var result = SVN.matchAll('NC00001_1.11:g.[123123T>C];[123123T>G];[123123T>A]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(TransVariant);
      expect(result.variant.variants).toHaveLength(3);
      var [variant1, variant2,variant3] = result.variant.variants;
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit.ref).toEqual('T');
      expect(variant1.edit.alt).toEqual('C');
      expect(variant2.edit.ref).toEqual('T');
      expect(variant2.edit.alt).toEqual('G');
      expect(variant3.edit.ref).toEqual('T');
      expect(variant3.edit.alt).toEqual('A');
    });

    it('should read a variant with uncertain phases as an UnphasedVariant type', function () {
      var result = SVN.matchAll('NC00001_1.11:g.[123123T>C](;)[123123T>G](;)[123123T>A]', 'svnVariant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.variant).toBeInstanceOf(UnphasedVariant);
      expect(result.variant.variants).toHaveLength(3);
      var [variant1, variant2,variant3] = result.variant.variants;
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit.ref).toEqual('T');
      expect(variant1.edit.alt).toEqual('C');
      expect(variant2.edit.ref).toEqual('T');
      expect(variant2.edit.alt).toEqual('G');
      expect(variant3.edit.ref).toEqual('T');
      expect(variant3.edit.alt).toEqual('A');
    });

    context('parsing complex unphased variants with both cis and trans variants, the variant', function () {
      var result;
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
        var unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3;
        beforeEach(()=>{
          [unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3] = result.variant.variants;
        });

        it('the second unphased variant should be parsed correctly', function () {
          // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                               ^^^^^^^^
          expect(unphasedVariantChild2).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild2.pos).toEqual(222);
          expect(unphasedVariantChild2.edit.ref).toEqual('T');
          expect(unphasedVariantChild2.edit.alt).toEqual('G');
        });

        it('the third unphased child variant is a simple variant', function () {
          // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                                          ^^^^^^^^^
          expect(unphasedVariantChild3).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild3).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild3.pos).toEqual(333);
          expect(unphasedVariantChild3.edit.ref).toEqual('T');
          expect(unphasedVariantChild3.edit.alt).toEqual('A');
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
            var transSimpleVariant, transCisVariant;
            it('should be a Cis and Simple variant, respectively', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                 ^^^^^^^^^^^^^^^^^^ ^^^^^^^^

              [transCisVariant, transSimpleVariant] = unphasedVariantChild1.variants;
              expect(transCisVariant).toBeInstanceOf(CisVariant);
              expect(transSimpleVariant).toBeInstanceOf(SimpleVariant);
            });

            it('where the first cis variant contains two SimpleVariants', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                  ^^^^^^^^^ ^^^^^^

              expect(transCisVariant.variants).toHaveLength(2);
              var [v1,v2] = transCisVariant.variants;
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

  context('patterns', function () {
    context('logicPattern', function () {

    // { svnVariant } = pattern
    // { svnVariant & svnVariant ^ svnVariant }
    // { svn}
    // var result = SVN.matchAll('111T>C^222A>G]^[333T>A^444G>A]', 'svnVariant');

    });

  });

  context('cisVariant rule', function () {
    it('should parse [variant] as a SimpleVariant', function () {
      var cResult = SVN.matchAll('[123T>C]', 'cCisVariant');
      expect(cResult).toBeInstanceOf(SimpleVariant);

      var gResult = SVN.matchAll('[123T>C]', 'gCisVariant');
      expect(gResult).toBeInstanceOf(SimpleVariant);
    });

    it('should parse [variant;variant] as a CisVariant', function() {
      var cResult = SVN.matchAll('[123T>C;345A>G]', 'cCisVariant');
      expect(cResult).toBeInstanceOf(CisVariant);

      var gResult = SVN.matchAll('[123T>C;345A>G]', 'gCisVariant');
      expect(gResult).toBeInstanceOf(CisVariant);
    });
  });

  context('Logic Patterns', function () {
    it('should parse a SimpleVariant OR pattern', function () {
      var result = SVN.matchAll('111A>T^222C>G', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant AND pattern', function () {
      var result = SVN.matchAll('111A>T&222C>G', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant NOT pattern', function () {
      var result = SVN.matchAll('!111A>T', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expression).toBeInstanceOf(SimpleVariant);
    });


    it('should parse a SimpleVariant OR pattern with braces', function () {
      var result = SVN.matchAll('{111A>T^222C>G}', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant AND pattern with braces', function () {
      var result = SVN.matchAll('{111A>T&222C>G}', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant NOT pattern with surrounding braces', function () {
      var result = SVN.matchAll('{!111A>T}', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expression).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant NOT pattern with inner braces', function () {
      var result = SVN.matchAll('!{111A>T}', 'gSimpleVariantPattern');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.pattern).toEqual('gSimpleVariant');
      expect(result.expression).toBeInstanceOf(SimpleVariant);
    });

    context('Building a Variant Pattern',  function () {

    });

    context('Building a SequenceVariantPattern', function () {
      it('should return a SequenceVariantPattern', function () {
        var result = SVN.matchAll('NC0001_01.11:g.[111A>T^222G>C]', 'svnVariantPattern');
        expect(result).toBeInstanceOf(SequenceVariantPattern);
        expect(result.variant).toBeInstanceOf(OrExpr);
        expect(result.variant.expressions).toHaveLength(2);
      });
    });
  });
});
