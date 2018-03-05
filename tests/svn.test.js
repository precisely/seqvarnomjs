import { SVN } from 'src/svn';
import { SequenceVariant, TransVariant, NARefAlt } from 'src/elements';
import { UnphasedVariant, CisVariant, SimpleVariant } from '../src/elements';

describe('SVN', function () {
  context('#matchAll', function () {
    it('should read a simple nucleic acid variant', function () {
      var result = SVN.matchAll('NC00001_1.11:g.123123T>C', 'svn_variant');
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
      var result = SVN.matchAll('NC00001_1.11:g.123123=', 'svn_variant');
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
          result = SVN.matchAll('NC00001_1.11:g.[123123T>C];[123123=]', 'svn_variant');
        });

        it('should read a heterozygous variant as a TransVariant type', function () {
          expect(result).toBeInstanceOf(SequenceVariant);
          expect(result.ac).toEqual('NC00001_1.11');
          expect(result.type).toEqual('g');
          expect(result.variant).toBeInstanceOf(TransVariant);
          expect(result.variant.variants.length).toEqual(2);
        });

        it('and the transvariant should contain two cis variants', function () {
          var [variant1,variant2] = result.variant.variants;
          expect(variant1).toBeInstanceOf(CisVariant);
          expect(variant2).toBeInstanceOf(CisVariant);
          expect(variant1.variants.length).toEqual(1);
          expect(variant1.variants[0]).toBeInstanceOf(SimpleVariant);
          expect(variant1.variants[0].pos).toEqual(123123);
          expect(variant1.variants[0].edit).toBeInstanceOf(NARefAlt);
          expect(variant1.variants[0].edit.ref).toEqual('T');
          expect(variant1.variants[0].edit.alt).toEqual('C');

          expect(variant2.variants.length).toEqual(1);
          expect(variant2.variants[0]).toBeInstanceOf(SimpleVariant);
          expect(variant2.variants[0].pos).toEqual(123123);
          expect(variant2.variants[0].edit).toBeNull();
        });
      });

      it('should read a wild type variant as a TransAllele type', function () {
        var result = SVN.matchAll('NC00001_1.11:g.[123123=];[123123=]', 'svn_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(TransVariant);
        expect(result.variant.variants).toHaveLength(2);
        var [variant1, variant2] = result.variant.variants;
        expect(variant1.variants).toHaveLength(1);
        expect(variant1.variants[0].pos).toEqual(123123);
        expect(variant1.variants[0].edit).toBeNull();
        expect(variant2.variants).toHaveLength(1);
        expect(variant2.variants[0].pos).toEqual(123123);
        expect(variant2.variants[0].edit).toBeNull();
      });

      it('should read a tri-allelic variant as a TransVariant type', function () {
        var result = SVN.matchAll('NC00001_1.11:g.[123123T>C];[123123T>G];[123123T>A]', 'svn_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(TransVariant);
        expect(result.variant.variants).toHaveLength(3);
        var [variant1, variant2,variant3] = result.variant.variants;
        expect(variant1.variants).toHaveLength(1);
        expect(variant1.variants[0].pos).toEqual(123123);
        expect(variant1.variants[0].edit.ref).toEqual('T');
        expect(variant1.variants[0].edit.alt).toEqual('C');
        expect(variant2.variants[0].edit.ref).toEqual('T');
        expect(variant2.variants[0].edit.alt).toEqual('G');
        expect(variant3.variants[0].edit.ref).toEqual('T');
        expect(variant3.variants[0].edit.alt).toEqual('A');
      });

      it('should read a variant with uncertain phases as an UnphasedVariant type', function () {
        var result = SVN.matchAll('NC00001_1.11:g.[123123T>C](;)[123123T>G](;)[123123T>A]', 'svn_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(UnphasedVariant);
        expect(result.variant.variants).toHaveLength(3);
        var [variant1, variant2,variant3] = result.variant.variants;
        expect(variant1.variants).toHaveLength(1);
        expect(variant1.variants[0].pos).toEqual(123123);
        expect(variant1.variants[0].edit.ref).toEqual('T');
        expect(variant1.variants[0].edit.alt).toEqual('C');
        expect(variant2.variants[0].edit.ref).toEqual('T');
        expect(variant2.variants[0].edit.alt).toEqual('G');
        expect(variant3.variants[0].edit.ref).toEqual('T');
        expect(variant3.variants[0].edit.alt).toEqual('A');
      });

      context('parsing complex unphased variants with both cis and trans variants, the variant', function () {
        var result;
        beforeEach(function() {
          result = SVN.matchAll('NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]', 'svn_variant');
        });

        it('should be an UnphasedVariant containing three variants', function () {
          expect(result).toBeInstanceOf(SequenceVariant);
          expect(result.variant).toBeInstanceOf(UnphasedVariant);
          expect(result.variant.variants).toHaveLength(3);
          // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
          //                 1)^^^^^^^^^^^^^^^^^^^^^^^^^   2)^^^^^^^^^   3)^^^^^^^^^
        });

        context('where the UnphasedVariant contains a TransVariant containing and two cis variants, where', function () {
          var transVariant, cisVariant1, cisVariant2;
          beforeEach(()=>{
            [transVariant, cisVariant1, cisVariant2] = result.variant.variants;
          });

          it('the first unphased cisVariant should be parsed correctly', function () {
            // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
            //                                               ^^^^^^^^
            expect(cisVariant1).toBeInstanceOf(CisVariant);
            var simpleVariant = cisVariant1.variants[0];
            expect(simpleVariant).toBeInstanceOf(SimpleVariant);
            expect(simpleVariant.pos).toEqual(222);
            expect(simpleVariant.edit.ref).toEqual('T');
            expect(simpleVariant.edit.alt).toEqual('G');
          });

          it('the second unphased cisVariant should be parsed correctly', function () {
            // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
            //                                                          ^^^^^^^^^
            expect(cisVariant2).toBeInstanceOf(CisVariant);
            var simpleVariant = cisVariant2.variants[0];
            expect(simpleVariant).toBeInstanceOf(SimpleVariant);
            expect(simpleVariant.pos).toEqual(333);
            expect(simpleVariant.edit.ref).toEqual('T');
            expect(simpleVariant.edit.alt).toEqual('A');
          });


          context('the trans variant', function () {
            it('should be a TransVariant', function () {
              // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
              //                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^
              expect(transVariant).toBeInstanceOf(TransVariant);
            });

            it('should contain two variants,', function () {
              expect(transVariant.variants).toHaveLength(2);
            });

            context('and those variants', function () {
              var transCisVariant1, transCisVariant2;
              it('should be CisVariants', function () {
                // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
                //                 ^^^^^^^^^^^^^^^^^^ ^^^^^^^^

                [transCisVariant1, transCisVariant2] = transVariant.variants;
                expect(transCisVariant1).toBeInstanceOf(CisVariant);
                expect(transCisVariant2).toBeInstanceOf(CisVariant);
              });

              it('where the first cis variant contains two SimpleVariants', function () {
                // 'NC00001_1.11:g.[123123T>C;999A>G];[444C>T](;)[222T>G](;)[333T>A]'
                //                  ^^^^^^^^^ ^^^^^^

                expect(transCisVariant1.variants).toHaveLength(2);
                var [v1,v2] = transCisVariant1.variants;
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
                expect(transCisVariant2).toBeInstanceOf(CisVariant);
                expect(transCisVariant2.variants).toHaveLength(1);
                var simpleVariant = transCisVariant2.variants[0];
                expect(simpleVariant).toBeInstanceOf(SimpleVariant);
                expect(simpleVariant.pos).toEqual(444);
                expect(simpleVariant.edit.ref).toEqual('C');
                expect(simpleVariant.edit.alt).toEqual('T');
              });
            });

          });

          it('the cisVariants should be CisVariant objects', function () {
            expect(cisVariant1).toBeInstanceOf(CisVariant);
            expect(cisVariant2).toBeInstanceOf(CisVariant);
          });


          // expect(transVariant.variants).toHaveLength(2);
          // var [cisVariant1, cisVariant2] = transVariant.variants;
          // expect(cisVariant1).toBeInstanceOf(CisVariant);
          // expect(cisVariant2).toBeInstanceOf(CisVariant);
        });


      });
    });

  });
});
