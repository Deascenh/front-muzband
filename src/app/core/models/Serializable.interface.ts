interface Serializable<T> {
  deserialize(input: any): T;
  toString(): string;
}
