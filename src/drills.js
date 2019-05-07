require('dotenv').config()

const knexInstance = {
    client: 'pg',
    connection: process.env.DB_URL,
}

const knex = require('knex')(knexInstance)
console.log('connection successful');

function searchByName(searchTerm) {
    knex
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

function paginateProducts(page) {
    const productsPerPage = 6
    const offset = productsPerPage * (page - 1)
    knex
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function addedAfterDaysAgo(daysAgo) {
    knex
        .select('name', 'price', 'date_added', 'category')
        .where(
            'date_added',
            '>',
            knex.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .from('shopping_list')
        .groupBy('category')
        .orderBy([
            { column: 'date_added', order: 'ASC' },
            { column: 'category', order: 'ASC' },
        ])
        .then(result => {
            console.log(result)
        })
}

function addPriceByCategory() {
    console.log('price')
    knex
        .select('category')
        .from('shopping_list')
        .count('name')
        .sum('price')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

addPriceByCategory();
