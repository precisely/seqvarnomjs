import { HGVS } from 'src/hgvs';

describe('HGVS', function () {
  context('#matchAll', function () {
    it('should read a simple nucleic acid variant', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.123123T>C', 'hgvs_variant');
      expect(result._type).toEqual('SequenceVariant');
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant._type).toEqual('PosEdit');
      expect(result.variant.pos.start).toEqual(123123);
      expect(result.variant.pos.end).toEqual(123123);
      expect(result.variant.edit._type).toEqual('NARefAlt');
      expect(result.variant.edit.ref).toEqual('T');
      expect(result.variant.edit.alt).toEqual('C');
    });

    it('should read a wild-type variant', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.123123=', 'hgvs_variant');
      expect(result._type).toEqual('SequenceVariant');
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant._type).toEqual('PosEdit');
      expect(result.variant.pos.start).toEqual(123123);
      expect(result.variant.pos.end).toEqual(123123);
      expect(result.variant.edit._type).toEqual('NARefAlt');
      expect(result.variant.edit.ref).toEqual('');
      expect(result.variant.edit.alt).toEqual('');
    });

    it('should read a heterozygous variant', function () {
      var result = HGVS.matchAll('NC00001_1.11:g.[123123T>C];[123123=]', 'hgvs_variant');
      console.log(JSON.stringify(result,null,2));
      expect(result._type).toEqual('SequenceVariant');
      expect(result.ac).toEqual('NC00001_1.11');
      expect(result.type).toEqual('g');
      expect(result.variant._type).toEqual('TransAlleles');
      expect(result.variant.alleles).toEqual([
        {
          _type: 'Allele',
          edits: [
            {
              _type: 'PosEdit',
              pos: {
                _type: 'Interval',
                "start": 123123,
                "end": 123123
              },
              "edit": {
                "_type": "NARefAlt",
                "ref": "T",
                "alt": "C"
              }
            }
          ]
        },
        {
          _type: 'Allele',
          edits: [
            {
              _type: 'PosEdit',
              pos: {
                _type: 'Interval',
                "start": 123123,
                "end": 123123
              },
              "edit": {
                "_type": "NARefAlt",
                "ref": "",
                "alt": ""
              }
            }
          ]
        }
      ]);
    });
  });
});