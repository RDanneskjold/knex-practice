require('dotenv').config()
const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')


const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.use(require("chai-sorted"));


describe(`Items service object`, function () {
    let db
    let testItems = [
        {
            id: 1,
            name: 'First item',
            price: 13.10,
            category: 'Main',
            checked: false,
            date_added: new Date('2102-08-22T16:28:32.615Z')
        },
        {
            id: 2,
            name: 'Second item',
            price: 100.23,
            category: 'Lunch',
            checked: true,
            date_added: new Date('2100-05-22T16:28:32.615Z'),
        },
        {
            id: 3,
            name: 'Third item',
            price: 1.43,
            category: 'Snack',
            checked: false,
            date_added: new Date('1919-12-22T16:28:32.615Z'),
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    afterEach(() => db('shopping_list').truncate())
    after(() => db.destroy())

    before(() => db('shopping_list').truncate())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItems() resolves all Items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves an Item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        category: thirdTestItem.category,
                        checked: thirdTestItem.checked,
                        date_added: thirdTestItem.date_added,
                    })
                })
        })

        it(`deleteItem() removes an Item by id from 'shopping_list' table`, () => {
            const ItemId = 3
            return ShoppingListService.deleteItem(db, ItemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    // copy the test Items array without the "deleted" Item
                    const expected = testItems.filter(Item => Item.id !== ItemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an Item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated name',
                price: 500.19,
                category: 'Breakfast',
                checked: false,
                date_added: new Date(),
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(Item => {
                    expect(Item).to.eql({
                        id: idOfItemToUpdate,
                        price: String(newItemData.price),
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new Item and resolves the new Item with an 'id'`, () => {
            const newItem = {
                name: 'Test new name',
                price: 10.19,
                category: 'Lunch',
                checked: true,
                date_added: new Date('2020-01-01T00:00:00.000Z'),
            }

            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        category: newItem.category,
                        checked: newItem.checked,
                        date_added: new Date(newItem.date_added),
                    })
                })
        })

    })

})
