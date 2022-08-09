interface AggregateObjectProps {
  [index: string]: any;
}

export abstract class AggregateRoot<
  T extends AggregateObjectProps,
  U = number,
> {
  public props: T;
  protected readonly _id: U;

  protected constructor(props: T, id: U) {
    this.props = { ...props };
    this._id = id;
  }

  get id(): U {
    return this._id as U;
  }
}

/**
 * _id 가 protected 지정 되어 있으므로
 * 상속받은 class에서만 접근할 수 있고, get을 통해 해당 id 값을 얻을 수 있다.
   const aggregate = new AggregateRoot([1, 2, 3], "3");
  console.log(aggregate); //{ props: { '0': 1, '1': 2, '2': 3 }, _id: '3' }
  console.log(aggregate.id); // string 3


  const aggregate1 = new AggregateRoot({ prop: 1 }, 3);
  console.log(aggregate1); // { props: { prop: 1 }, _id: 3 }
  console.log(aggregate1.id); // number 3
 */
