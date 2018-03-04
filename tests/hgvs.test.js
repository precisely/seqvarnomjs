import { HGVS } from 'src/hgvs';

describe('HGVS', function () {
  context('context', function () {
    it('should read an accession number', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.123123T>C', 'hgvs_variant');
      expect(result._type).toEqual('SequenceVariant');
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.posedit._type).toEqual('PosEdit');
      expect(result.posedit.pos.start).toEqual(123123);
      expect(result.posedit.pos.end).toEqual(123123);
      expect(result.posedit.edit._type).toEqual('NARefAlt');
      expect(result.posedit.edit.ref).toEqual('T');
      expect(result.posedit.edit.alt).toEqual('C');
    });
  });
});