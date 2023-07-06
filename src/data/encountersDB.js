class Character extends Realm.Object {
  static schema = {
    name: 'Character',
    properties: {
      name: 'string',
      ac: 'int',
      hp: 'int',
      status: 'string[]',  // assumes this is a list of strings
      type: 'string',
      initiative: 'int',
      cr: {type: 'double', optional: true}
    }
  }
}

class Encounter extends Realm.Object {
  static schema = {
    name: 'Encounter',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.Bson.ObjectId()},
      title: 'string',
      active: 'int',
      target: 'int',
      xpEarned: 'int',
      loot: 'string[]',
      chars: 'Character[]'
    }
  }
}