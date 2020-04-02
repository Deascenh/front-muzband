/**
 * Linked Data Resource
 * Describes properties specified by JSON-LD Standard
 * https://json-ld.org/
 * https://en.wikipedia.org/wiki/JSON-LD
 */
export class LdResource {
  readonly '@context': string | null;
  readonly '@type': string | null;
  readonly '@id': string | null;

  constructor(obj?: any) {
    if (obj) {
      this['@context'] = obj['@context'] || null;
      this['@type'] = obj['@type'] || null;
      this['@id'] = obj['@id'] || null;
    }
  }
}
