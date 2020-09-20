import { Collection } from './../models/Collection'

export abstract class CollectionView2<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    const models = this.collection.models
    for (let item of models) {
      const wrapperElement = document.createElement('div')
      this.renderItem(item, wrapperElement)
      templateElement.content.append(wrapperElement)
    }
    this.parent.append(templateElement.content)
  }
}
