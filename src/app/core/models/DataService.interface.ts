interface DataService<T> {
  deserializeHydraMember(input: any): T[];
}
