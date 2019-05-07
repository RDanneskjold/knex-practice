require('dotenv').config()

const knexInstance = {
    client: 'pg',
    connection: process.env.DB_URL,
}

const knex = require('knex')(knexInstance)
console.log('connection successful');

// const qry = knex
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery()
// // .then(result => {
// //   console.log(result)
// // })

// console.log(qry)


// SELECT product_id, name, price, category
// FROM amazong_products
// WHERE name LIKE '%holo%';
function searchByProduceName(searchTerm) {
    knex
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchByProduceName('holo')

// SELECT product_id, name, price, category
// FROM amazong_products
// LIMIT 10
// OFFSET 0;

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knex
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateProducts(2)

// SELECT product_id, name, price, category, image
// FROM amazong_products
// WHERE image IS NOT NULL;
function getProductsWithImages() {
    knex
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}

getProductsWithImages()

// SELECT video_name, region, count(date_viewed) AS views
// FROM whopipe_video_views
// WHERE date_viewed > (now() - '30 days':: INTERVAL)
// GROUP BY video_name, region
// ORDER BY region ASC, views DESC;
function mostPopularVideosForDays(days) {
    knex
        .select('video_name', 'region')
        .count('date_viewed AS views')
        .where(
            'date_viewed',
            '>',
            knex.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .from('whopipe_video_views')
        .groupBy('video_name', 'region')
        .orderBy([
            { column: 'region', order: 'ASC' },
            { column: 'views', order: 'DESC' },
        ])
        .then(result => {
            console.log(result)
        })
}

mostPopularVideosForDays(30)