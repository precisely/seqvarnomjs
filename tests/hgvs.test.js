import { HGVS } from 'src/hgvs';
import { SequenceVariant, PosEdit, TransAlleles, NARefAlt } from 'src/elements';
import { Allele, UnphasedAlleles } from '../src/elements';

describe('HGVS', function () {
  context('#matchAll', function () {
    it('should read a simple nucleic acid variant', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.123123T>C', 'hgvs_variant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant).toBeInstanceOf(PosEdit);
      expect(result.variant.pos).toEqual(123123);
      expect(result.variant.edit).toBeInstanceOf(NARefAlt);
      expect(result.variant.edit.ref).toEqual('T');
      expect(result.variant.edit.alt).toEqual('C');
    });

    it('should read a wild-type variant', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.123123=', 'hgvs_variant');
      expect(result).toBeInstanceOf(SequenceVariant);
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant).toBeInstanceOf(PosEdit);
      expect(result.variant.pos).toEqual(123123);
      expect(result.variant.edit).toBeNull();
    });

    context('when provided with a representation of a trans allele', function() {
      /*eslint-disable */
      it('should read a heterozygous variant as a TransAllele type', function () {
        var result = HGVS.matchAll('NC00001_1.11:g.[123123T>C];[123123=]', 'hgvs_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.ac).toEqual('NC00001_1.11');
        expect(result.type).toEqual('g');
        expect(result.variant).toBeInstanceOf(TransAlleles);
        expect(result.variant.alleles.length).toEqual(2);
        var [allele1,allele2] = result.variant.alleles;
        expect(allele1).toBeInstanceOf(Allele);
        expect(allele2).toBeInstanceOf(Allele);
        expect(allele1.edits.length).toEqual(1);
        expect(allele1.edits[0]).toBeInstanceOf(PosEdit);
        expect(allele1.edits[0].pos).toEqual(123123);
        expect(allele1.edits[0].edit).toBeInstanceOf(NARefAlt);
        expect(allele1.edits[0].edit.ref).toEqual('T');
        expect(allele1.edits[0].edit.alt).toEqual('C');

        expect(allele2.edits.length).toEqual(1);
        expect(allele2.edits[0]).toBeInstanceOf(PosEdit);
        expect(allele2.edits[0].pos).toEqual(123123);
        expect(allele2.edits[0].edit).toBeNull();
      });
      /*eslint-enable */

      it('should read a wild type variant as a TransAllele type', function () {
        var result = HGVS.matchAll('NC00001_1.11:g.[123123=];[123123=]', 'hgvs_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(TransAlleles);
        expect(result.variant.alleles).toHaveLength(2);
        var [allele1, allele2] = result.variant.alleles;
        expect(allele1.edits).toHaveLength(1);
        expect(allele1.edits[0].pos).toEqual(123123);
        expect(allele1.edits[0].edit).toBeNull();
        expect(allele2.edits).toHaveLength(1);
        expect(allele2.edits[0].pos).toEqual(123123);
        expect(allele2.edits[0].edit).toBeNull();
      });

      it('should read a tri-allelic variant as a TransAlleles type', function () {
        var result = HGVS.matchAll('NC00001_1.11:g.[123123T>C];[123123T>G];[123123T>A]', 'hgvs_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(TransAlleles);
        expect(result.variant.alleles).toHaveLength(3);
        var [allele1, allele2,allele3] = result.variant.alleles;
        expect(allele1.edits).toHaveLength(1);
        expect(allele1.edits[0].pos).toEqual(123123);
        expect(allele1.edits[0].edit.ref).toEqual('T');
        expect(allele1.edits[0].edit.alt).toEqual('C');
        expect(allele2.edits[0].edit.ref).toEqual('T');
        expect(allele2.edits[0].edit.alt).toEqual('G');
        expect(allele3.edits[0].edit.ref).toEqual('T');
        expect(allele3.edits[0].edit.alt).toEqual('A');
      });

      it('should read a variant with uncertain phases as an UnphasedAlleles type', function () {
        var result = HGVS.matchAll('NC00001_1.11:g.[123123T>C](;)[123123T>G](;)[123123T>A]', 'hgvs_variant');
        expect(result).toBeInstanceOf(SequenceVariant);
        expect(result.variant).toBeInstanceOf(UnphasedAlleles);
        expect(result.variant.alleles).toHaveLength(3);
        var [allele1, allele2,allele3] = result.variant.alleles;
        expect(allele1.edits).toHaveLength(1);
        expect(allele1.edits[0].pos).toEqual(123123);
        expect(allele1.edits[0].edit.ref).toEqual('T');
        expect(allele1.edits[0].edit.alt).toEqual('C');
        expect(allele2.edits[0].edit.ref).toEqual('T');
        expect(allele2.edits[0].edit.alt).toEqual('G');
        expect(allele3.edits[0].edit.ref).toEqual('T');
        expect(allele3.edits[0].edit.alt).toEqual('A');
      });
    });

  });
});
