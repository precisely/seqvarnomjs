import { SVN, GenomicSimple, GenomicCis, GenomicTrans, GenomicUnphased } from 'src/svn';
import { SequenceVariant, TransVariant, NARefAlt } from 'src/elements';
import { UnphasedVariant, CisVariant, SimpleVariant, SequenceVariantPattern, OrExpr, AndExpr, NotExpr } from '../src/elements';

describe('svn.ometa', function () {

  context('GenomicsSimple', function () {
    it('should read a simple variant', function () {
      var result = GenomicSimple.matchAll('111T>C', 'variant');
      expect(result).toBeInstanceOf(SimpleVariant);
      expect(result.pos).toEqual(111);
      expect(result.edit).toBeInstanceOf(NARefAlt);
      expect(result.edit.ref).toEqual('T');
      expect(result.edit.alt).toEqual('C');
    });

    it('should read a simple wild-type variant', function () {
      var result = GenomicSimple.matchAll('222=', 'variant');
      expect(result).toBeInstanceOf(SimpleVariant);
      expect(result.pos).toEqual(222);
      expect(result.edit).toBeNull();
    });

    it('should read logic expressions involving simple variants', function () {
      var result = GenomicSimple.matchAll('111T>C&222=', 'logic');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[1]).toBeInstanceOf(SimpleVariant);
    });
  }); // end of GenomicSimple

  context('GenomicCis', function () {
    it('should parse [variant] as a SimpleVariant', function () {
      var result = GenomicCis.matchAll('[123T>C]', 'variant');
      expect(result).toBeInstanceOf(SimpleVariant);
    });

    it('should parse [variant;variant] as a CisVariant', function() {
      var result = GenomicCis.matchAll('[123T>C;345A>G]', 'variant');
      expect(result).toBeInstanceOf(CisVariant);
    });
  }); // end of GenomicCis

  context('GenomicTrans', function () {
    it('should read a heterozygous variant as a TransVariant type', function () {
      var result = GenomicTrans.matchAll('[111T>C];[222=]', 'variant');
      expect(result).toBeInstanceOf(TransVariant);
      expect(result.variants).toHaveLength(2);
      var [variant1,variant2] = result.variants;
      expect(variant1).toBeInstanceOf(SimpleVariant);
      expect(variant2).toBeInstanceOf(SimpleVariant);
      expect(variant1.toString()).toEqual('111T>C');
      expect(variant2.toString()).toEqual('222=');
    });

    it('should read a wild type variant as a TransAllele type', function () {
      var result = GenomicTrans.matchAll('[123123=];[123123=]', 'variant');
      expect(result).toBeInstanceOf(TransVariant);
      expect(result.variants).toHaveLength(2);
      var [variant1, variant2] = result.variants;
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit).toBeNull();
      expect(variant2.pos).toEqual(123123);
      expect(variant2.edit).toBeNull();
    });

    it('should read a tri-allelic variant as a TransVariant type', function () {
      var result = GenomicTrans.matchAll('[123123T>C];[123123T>G];[123123T>A]', 'variant');
      expect(result).toBeInstanceOf(TransVariant);
      expect(result.variants).toHaveLength(3);
      var [variant1, variant2,variant3] = result.variants;
      expect(variant1.pos).toEqual(123123);
      expect(variant1.edit.ref).toEqual('T');
      expect(variant1.edit.alt).toEqual('C');
      expect(variant2.edit.ref).toEqual('T');
      expect(variant2.edit.alt).toEqual('G');
      expect(variant3.edit.ref).toEqual('T');
      expect(variant3.edit.alt).toEqual('A');
    });

    it('should read a trans variant containing cis variants', function () {
      var result = GenomicTrans.matchAll('[111T>C;222=];[333G>A;444A>T]', 'variant');
      expect(result).toBeInstanceOf(TransVariant);
      expect(result.variants).toHaveLength(2);
      var [variant1, variant2] = result.variants;
      expect(variant1).toBeInstanceOf(CisVariant);
      expect(variant2).toBeInstanceOf(CisVariant);
    });
  }); // end of GenomicTrans

  context('GenomicUnphased', function () {
    context('parsing complex unphased variants with both cis and trans variants, the variant', function () {
      var result;
      beforeEach(function() {
        result = GenomicUnphased.matchAll('[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]', 'variant');
      });

      it('should be an UnphasedVariant containing three variants', function () {
        expect(result).toBeInstanceOf(UnphasedVariant);
        expect(result.variants).toHaveLength(3);
        // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
        // 1)^^^^^^^^^^^^^^^^^^^^^^^^^   2)^^^^^^^^^   3)^^^^^^^^^
      });

      context('with child variants', function () {
        var unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3;
        beforeEach(()=>{
          [unphasedVariantChild1, unphasedVariantChild2, unphasedVariantChild3] = result.variants;
        });

        it('the second unphased variant should be parsed correctly', function () {
          // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                ^^^^^^^^
          expect(unphasedVariantChild2).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild2.pos).toEqual(222);
          expect(unphasedVariantChild2.edit.ref).toEqual('T');
          expect(unphasedVariantChild2.edit.alt).toEqual('G');
        });

        it('the third unphased child variant is a simple variant', function () {
          // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                                          ^^^^^^^^^
          expect(unphasedVariantChild3).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild3).toBeInstanceOf(SimpleVariant);
          expect(unphasedVariantChild3.pos).toEqual(333);
          expect(unphasedVariantChild3.edit.ref).toEqual('T');
          expect(unphasedVariantChild3.edit.alt).toEqual('A');
        });


        context('the first unphased child variant variant', function () {
          it('should be a TransVariant', function () {
            // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
            //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^
            expect(unphasedVariantChild1).toBeInstanceOf(TransVariant);
          });

          it('should contain two variants,', function () {
            expect(unphasedVariantChild1.variants).toHaveLength(2);
          });

          context('and those variants', function () {
            var transSimpleVariant, transCisVariant;
            it('should be a Cis and Simple variant, respectively', function () {
              // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //  ^^^^^^^^^^^^^^^^^^ ^^^^^^^^

              [transCisVariant, transSimpleVariant] = unphasedVariantChild1.variants;
              expect(transCisVariant).toBeInstanceOf(CisVariant);
              expect(transSimpleVariant).toBeInstanceOf(SimpleVariant);
            });

            it('where the first cis variant contains two SimpleVariants', function () {
              // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //   ^^^^^^^^^ ^^^^^^

              expect(transCisVariant.variants).toHaveLength(2);
              var [v1,v2] = transCisVariant.variants;
              expect(v1).toBeInstanceOf(SimpleVariant);
              expect(v2).toBeInstanceOf(SimpleVariant);

              // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //   ^^^^^^^^^
              expect(v1.pos).toEqual(123123);
              expect(v1.edit.ref).toEqual('T');
              expect(v1.edit.alt).toEqual('C');

              // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //             ^^^^^^
              expect(v2.pos).toEqual(999);
              expect(v2.edit.ref).toEqual('A');
              expect(v2.edit.alt).toEqual('G');
            });

            it('where the second cis variant contains one Simple Variant', function () {
              // '[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                     ^^^^^^^^
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

  context('SVN', function () {
    it('should match an accession number', function () {
      var result = SVN.matchAll('NC00001_1.11', 'accn');
      expect(typeof result).toEqual('string');
    });

    it('should read a simple nucleic acid variant', function () {
      var result = SVN.matchAll('NC00001_1.11:g.123123T>C', 'variant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant).toBeInstanceOf(SimpleVariant);
      expect(result.variant.pos).toEqual(123123);
      expect(result.variant.edit).toBeInstanceOf(NARefAlt);
      expect(result.variant.edit.ref).toEqual('T');
      expect(result.variant.edit.alt).toEqual('C');
    });

    it('should read a cis variant', function () {
      var result = SVN.matchAll('NC00001_1.11:g.[111=;222T>C]', 'variant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant).toBeInstanceOf(CisVariant);
    });

    it('should read a trans variant', function () {

    });
  });

  context('Logic', function () {
    it('should parse a CisVariant OR pattern', function () {
      var result = GenomicCis.matchAll('[111A>T;222C>G]^[333=;444A>G]', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0].toString()).toEqual('[111A>T;222C>G]');
      expect(result.expressions[1].toString()).toEqual('[333=;444A>G]');
    });

    it('should parse a CisVariant AND pattern', function () {
      var result = GenomicCis.matchAll('[111A>T;222C>G]&[333=;444A>G]', 'logic');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0].toString()).toEqual('[111A>T;222C>G]');
      expect(result.expressions[1].toString()).toEqual('[333=;444A>G]');
    });

    it('should parse a CisVariant NOT pattern', function () {
      var result = GenomicCis.matchAll('![111A>T;222C>G]', 'logic');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.expression.toString()).toEqual('[111A>T;222C>G]');
    });


    it('should parse a SimpleVariant OR pattern with braces', function () {
      var result = GenomicSimple.matchAll('{111A>T^222C>G}', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant AND pattern with braces', function () {
      var result = GenomicSimple.matchAll('{111A>T&222C>G}', 'logic');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.expressions).toHaveLength(2);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
      expect(result.expressions[0]).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant NOT pattern with surrounding braces', function () {
      var result = GenomicSimple.matchAll('{!111A>T}', 'logic');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.expression).toBeInstanceOf(SimpleVariant);
    });

    it('should parse a SimpleVariant NOT pattern with inner braces', function () {
      var result = GenomicSimple.matchAll('!{111A>T}', 'logic');
      expect(result).toBeInstanceOf(NotExpr);
      expect(result.expression).toBeInstanceOf(SimpleVariant);
    });

    it('should parse logic patterns left associatively', function () {
      var result = GenomicSimple.matchAll('111A>T^222G>C&333T>C', 'logic');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.expressions).toHaveLength(2);
      var [lhs, rhs] = result.expressions;
      expect(lhs).toBeInstanceOf(OrExpr);
      expect(lhs.toString()).toEqual('111A>T^222G>C');
      expect(rhs.toString()).toEqual('333T>C');
    });

    it('should parse a SimpleVariant pattern where braces force right associativity', function () {
      var result = GenomicSimple.matchAll('111A>T^{222G>C&333T>C}', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.expressions).toHaveLength(2);
      var [lhs, rhs] = result.expressions;
      expect(lhs).toBeInstanceOf(SimpleVariant);
      expect(lhs.toString()).toEqual('111A>T');
      expect(rhs).toBeInstanceOf(AndExpr);
      expect(rhs.toString()).toEqual('222G>C&333T>C');
    });

    it('should combine a sequence of simple and expressions', function () {
      var result = GenomicSimple.matchAll('111A>T&222G>C&333T>C&444A>G', 'logic');
      expect(result).toBeInstanceOf(AndExpr);
      expect(result.expressions).toHaveLength(4);
      result.expressions.forEach(exp=>expect(exp).toBeInstanceOf(SimpleVariant));
    });

    it('should combine a sequence of or expressions', function () {
      var result = GenomicSimple.matchAll('111A>T^222G>C^333T>C^444A>G', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      expect(result.expressions).toHaveLength(4);
      result.expressions.forEach(exp=>expect(exp).toBeInstanceOf(SimpleVariant));
    });

    it('should bind the not operator to the left term inside a binary expression', function () {
      var result = GenomicSimple.matchAll('!111A>T^222G>C', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      var [lhs, rhs] = result.expressions;
      expect(lhs).toBeInstanceOf(NotExpr);
      expect(lhs.expression).toBeInstanceOf(SimpleVariant);
      expect(rhs).toBeInstanceOf(SimpleVariant);
    });

    it('should bind the not operator to the right term inside a binary expression', function () {
      var result = GenomicSimple.matchAll('111A>T^!222G>C', 'logic');
      expect(result).toBeInstanceOf(OrExpr);
      var [lhs, rhs] = result.expressions;
      expect(lhs).toBeInstanceOf(SimpleVariant);
      expect(rhs).toBeInstanceOf(NotExpr);
      expect(rhs.expression).toBeInstanceOf(SimpleVariant);
    });

    context('Building a SequenceVariantPattern', function () {
      it('should return a SequenceVariantPattern with an or expression in an allele', function () {
        var result = SVN.matchAll('NC0001_01.11:g.[111A>T^222G>C]', 'logic');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(OrExpr);
        expect(result.variant.expressions).toHaveLength(2);
        var [variant1, variant2] = result.variant.expressions;
        expect(variant1).toBeInstanceOf(SimpleVariant);
        expect(variant2).toBeInstanceOf(SimpleVariant);
      });
    });
  });

});
