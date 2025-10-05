
export interface Order {
  _id: string,
  tableNumber: number,
  customersCount: number,
  opened: string,
  lines: 
    {
      item: {
        _id: string,
        shortName: string
      },
      howMany: number,
      sentForPreparation: boolean
    }[],
  preparations: [
    {
      _id: string,
      shouldBeReadyAt: string,
      preparedItems: [
        {
          _id: string,
          shortName: string,
        }
      ]
    }
  ],
  billed: string
}