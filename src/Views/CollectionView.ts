import { Collection } from './../models/Collection'

export abstract class CollectionView<T extends Collection<X, Y>, X, Y> {
  constructor(public parent: Element, public collection: Collection<X, Y>) {}

  abstract renderItem(model: X, itemParent: Element): void
  abstract template(model: X): string

  render(): void {
    this.parent.innerHTML = ''
    const models = this.collection.models
    for (let item of models) {
      this.renderItem(item, this.parent)
    }
  }
}
